import linkModel from '../models/link.model.js';
import userModel from '../models/user.model.js';
import clickModel from '../models/click.model.js';
import mongoose from 'mongoose';


export const createLink = async (req, res) => {

    const user = req.user;
    const { title, url } = req.body;

    if (!title || !url) {
        return res.status(400).json({
            message: 'Title and URL are required',
        });
    }

    try {
        const newLink = await linkModel.create({
            user: user.id,
            title,
            url,
        });
        return res.status(201).json({
            message: 'Link created successfully',
            link: newLink,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Failed to create link',
        });
    }
}

export const getLinksByUsername = async (req, res) => {

    const { username } = req.params;

    const user = await userModel.findOne({ username })

    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }

    const links = await linkModel.find({
        user: user._id,
        isDeleted: false,
    });

    return res.status(200).json({
        message: 'Links retrieved successfully',
        links,
    });
}

export const recordClick = async (req, res) => {

    const { linkId } = req.params;

    try {
        const link = await linkModel.findOne({
            _id: linkId,
            isDeleted: false,
        });

        if (!link) {
            return res.status(404).json({
                message: 'Link not found',
            });
        }

        await clickModel.create({
            link: link._id,
        });

        return res.status(201).json({
            message: 'Click recorded successfully',
            url: link.url,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Failed to record click',
        });
    }
}

export const getLastSevenDaysAnalytics = async (req, res) => {

    const { linkId } = req.params;
    const user = req.user;

    if (!mongoose.isValidObjectId(linkId)) {
        return res.status(400).json({
            message: 'Invalid link ID',
        });
    }

    try {
        const link = await linkModel.findOne({
            _id: linkId,
            user: user.id,
            isDeleted: false,
        });

        if (!link) {
            return res.status(404).json({
                message: 'Link not found',
            });
        }

        const now = new Date();
        const endDate = new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() + 1,
        ));
        const startDate = new Date(endDate);
        startDate.setUTCDate(startDate.getUTCDate() - 7);

        const clickCounts = await clickModel.aggregate([
            {
                $match: {
                    link: link._id,
                    clickedAt: {
                        $gte: startDate,
                        $lt: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$clickedAt',
                            timezone: 'UTC',
                        },
                    },
                    clicks: { $sum: 1 },
                },
            },
        ]);

        const clickCountByDate = new Map(
            clickCounts.map((item) => [ item._id, item.clicks ]),
        );

        const analytics = [];

        for (let day = 0; day < 7; day++) {
            const date = new Date(startDate);
            date.setUTCDate(date.getUTCDate() + day);

            const dateString = date.toISOString().slice(0, 10);

            analytics.push({
                date: dateString,
                clicks: clickCountByDate.get(dateString) || 0,
            });
        }

        return res.status(200).json({
            message: 'Click analytics retrieved successfully',
            link: {
                id: link._id,
                title: link.title,
            },
            analytics,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Failed to retrieve click analytics',
        });
    }
}

export const softDeleteLink = async (req, res) => {

    const { linkId } = req.params;
    const user = req.user;

    if (!mongoose.isValidObjectId(linkId)) {
        return res.status(400).json({
            message: 'Invalid link ID',
        });
    }

    try {
        const link = await linkModel.findOneAndUpdate(
            {
                _id: linkId,
                user: user.id,
                isDeleted: false,
            },
            {
                isDeleted: true,
                deletedAt: new Date(),
            },
            {
                new: true,
            },
        );

        if (!link) {
            return res.status(404).json({
                message: 'Active link not found',
            });
        }

        return res.status(200).json({
            message: 'Link deleted successfully',
            link,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Failed to delete link',
        });
    }
}

export const getDeletedLinks = async (req, res) => {

    const user = req.user;

    try {
        const links = await linkModel.find({
            user: user.id,
            isDeleted: true,
        }).sort({ deletedAt: -1 });

        return res.status(200).json({
            message: 'Deleted links retrieved successfully',
            links,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Failed to retrieve deleted links',
        });
    }
}

export const purgeLink = async (req, res) => {

    const { linkId } = req.params;
    const user = req.user;

    if (!mongoose.isValidObjectId(linkId)) {
        return res.status(400).json({
            message: 'Invalid link ID',
        });
    }

    try {
        const link = await linkModel.findOne({
            _id: linkId,
            user: user.id,
            isDeleted: true,
        });

        if (!link) {
            return res.status(404).json({
                message: 'Deleted link not found',
            });
        }

        await clickModel.deleteMany({
            link: link._id,
        });

        await link.deleteOne();

        return res.status(200).json({
            message: 'Link permanently deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Failed to permanently delete link',
        });
    }
}
