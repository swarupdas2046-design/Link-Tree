import { Router } from 'express';
import { claimUsername, loginUser, registerUser } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import validateRequest from '../middlewares/validateRequest.js';
import { loginValidation, registerValidation } from '../validators/auth.validators.js';
import { usernameValidation } from '../validators/username.validators.js';

const router = Router();

router.post('/register', usernameValidation, registerValidation, validateRequest, registerUser);
router.post('/login', loginValidation, validateRequest, loginUser);
router.patch('/claim-username', authMiddleware, usernameValidation, validateRequest, claimUsername);

export default router;
