import nodemailer from "nodemailer";

const { env } = process;

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: env.EMAIL_SERVICE,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: env.EMAIL_USERNAME,
      pass: env.APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message,
  });
};
