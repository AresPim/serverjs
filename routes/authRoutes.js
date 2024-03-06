import express from "express";
const router = express.Router();
import { signin, signUp, forgotPassword, resetPassword } from '../controllers/authController.js';

// Routes pour l'authentification
router.post("/signin", signin);
router.post("/signup", signUp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
