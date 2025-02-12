import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { sendEmail } from "../utils/email";
import { AppError } from "../middleware/error";

const authService = new AuthService();

export class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token, verificationToken } = await authService.signup(
        req.body
      );

      const verificationUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/auth/verify/${verificationToken}`;

      await sendEmail({
        email: user.email,
        subject: "Email Verification",
        message: `Please click on the link to verify your email: ${verificationUrl}`,
      });

      res.status(200).json({
        success: true,
        id: user.id,
        username: user.username,
        email: user.email,
        message:
          "Registration successful. Please check your email to verify your account.",
        token,
      });
    } catch (error) {
      console.error("Error:", error)
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await authService.login(req.body);

      res.status(200).json({
        success: true,
        id: user.id,
        username: user.username,
        email: user.email,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.verifyToken(req.body.token);

      res.status(200).json({
        success: true,
        message: "Token verified successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.verifyEmail(req.params.token);

      res.status(200).json({
        success: true,
        message: "Email verified successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {

      if (!req.body.email) {
        throw new AppError("Please provide an email", 400);
      }

      const resetToken = await authService.forgotPassword(req.body.email);

      const resetUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/auth/resetpassword/${resetToken}`;

      await sendEmail({
        email: req.body.email,
        subject: "Password Reset",
        message: `You requested a password reset. Please go to: ${resetUrl}`,
      });

      res.status(200).json({
        success: true,
        message: "Password reset email sent",
      });
    } catch (error) {
      next(error);
    }
  }
}
