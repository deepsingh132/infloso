import express from "express";
import { AuthController } from "../controllers/auth.controller";

const router = express.Router();
const authController = new AuthController();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/verify", authController.verifyToken);
router.get("/verify/:token", authController.verifyEmail);
router.post("/forgotpassword", authController.forgotPassword);

export default router;
