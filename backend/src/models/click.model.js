import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema({
    link: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link',
        required: true,
    },
    clickedAt: {
        type: Date,
        default: Date.now,
    },
});

clickSchema.index({ link: 1, clickedAt: 1 });

const Click = mongoose.model('Click', clickSchema);

export default Click;
