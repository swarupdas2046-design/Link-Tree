import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import clickRateLimiter from '../middlewares/clickRateLimiter.js';
import * as linkController from '../controllers/links.controller.js';

const router = Router();

router.post("/", authMiddleware, linkController.createLink)

router.post("/:linkId/click", clickRateLimiter, linkController.recordClick)

router.get("/:linkId/analytics", authMiddleware, linkController.getLastSevenDaysAnalytics)

router.get("/:username", linkController.getLinksByUsername)

export default router;
