import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import validator from "validator";
import { UserInput, LoginInput } from "../types/user";
import { db } from "../db/connect";
import { AppError } from "../middleware/error";

export class AuthService {
  private generateToken(userId: string, rememberMe: boolean = false): string {
    const env = process.env;
    const expiresIn = rememberMe ? parseInt(env.JWT_LONG_EXPIRE, 10) : parseInt(env.JWT_EXPIRE, 10);
    return jwt.sign({ id: userId }, env.JWT_SECRET, {
      expiresIn
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async signup(input: UserInput) {

    // validate user input
    if (!input.username || !input.email || !input.password) {
      throw new AppError("Please provide all required fields", 400);
    }

    if (!validator.isEmail(input.email)) {
      throw new AppError("Invalid email", 400);
    }

    if (!validator.isStrongPassword(input.password)) {
      throw new AppError("Password is not strong enough", 400);
    }

    const existingUser = await db.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new AppError("User already exists", 400);
    }

    const hashedPassword = await this.hashPassword(input.password);

    const verificationToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    const user = await db.user.create({
      data: {
        ...input,
        password: hashedPassword,
        verificationToken: hashedToken,
        verificationTokenExpire: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    return {
      user,
      token: this.generateToken(user.id),
      verificationToken,
    };
  }

  async login(input: LoginInput) {

    if (!input.email || !input.password) {
      throw new AppError("Please provide all required fields", 400);
    }

    if (!validator.isEmail(input.email)) {
      throw new AppError("Invalid email", 400);
    }

    const user = await db.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new AppError("Invalid credentials or User not found", 404);
    }

    const isPasswordMatch = await bcrypt.compare(input.password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid credentials");
    }

    if (!user.verified) {
      throw new Error("Please verify your email first");
    }

    return {
      user,
      token: this.generateToken(user.id, input.rememberMe),
      expiresIn: input.rememberMe ? parseInt(process.env.JWT_LONG_EXPIRE, 10) : parseInt(process.env.JWT_EXPIRE, 10),
    };
  }

  async verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  async verifyEmail(token: string) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await db.user.findFirst({
      where: {
        verificationToken: hashedToken,
        verificationTokenExpire: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new Error("Invalid or expired verification token");
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        verified: true,
        verificationToken: null,
        verificationTokenExpire: null,
      },
    });

    return user;
  }

  async forgotPassword(email: string) {

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email");
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await db.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordExpire: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    return resetToken;
  }
}

