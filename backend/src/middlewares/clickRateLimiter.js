import { rateLimit } from 'express-rate-limit';

const clickRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'Too many click requests. Please try again after one minute.',
    },
});

export default clickRateLimiter;
