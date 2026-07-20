import nodemailer from "nodemailer";
import crypto from "crypto";
import { env } from "../../config/env";

import businessRepo from "../../repositories/business/business.repository.js";


class EmailService {
    private transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_SECURE === "true",
        auth: {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS,
        },
    });

    async sendBusinessEmailVerification(email: string, businessCode: string, businessName: string) {

        const token = crypto.randomBytes(32).toString("hex");

        // const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes


        await businessRepo.update(
            {
                business_code: businessCode,
            },
            {
                email_verification_token: token,
                email_verification_token_expires_at: expiresAt,
                email_verified: false,
            }
        );


        const verificationLink = `${env.APP_URL}/api/businesses/verify-email?token=${token}`;


        await this.transporter.sendMail({
            from: `"Luminary Pass" <${env.SMTP_USER}>`,
            to: email,
            subject: "Verify Your Business Email",
            html: `
            <h2>Verify your email</h2>

            <p>Welcome to Luminary Pass.</p>
            
              <p>
                    Your business <strong>${businessName}</strong> has been registered successfully.
                </p>

            <p>
                Please verify your email address by clicking below:
            </p>

            <a href="${verificationLink}">
                Verify Email
            </a>

            <p>
                This link expires in 5 minutes.
            </p>
        `,
        });
    }
}

export default new EmailService();