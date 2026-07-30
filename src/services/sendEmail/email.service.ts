import nodemailer from "nodemailer";
import crypto from "crypto";
import { env } from "../../config/env";

import businessRepo from "../../repositories/business/business.repository.js";
import userRepo from "../../repositories/user/user.repository.js";


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


    async sendProfileSetupEmail(email: string, userCode: string, businessName: string) {

        // console.log(email, userCode, businessName);

        const token = crypto.randomBytes(32).toString("hex");

        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        await userRepo.update(
            {
                user_code: userCode,
            },
            {
                profile_setup_token: token,
                profile_setup_token_expires_at: expiresAt,
            }
        );

        const setupLink = `${env.APP_URL}/api/users/setup-profile?token=${token}`;

        await this.transporter.sendMail({
            from: `"Luminary Pass" <${env.SMTP_USER}>`,
            to: email,
            subject: "Complete Your Luminary Pass Account",
            html: `
           <h2>Welcome to Luminary Pass</h2>

            <p>Hello,</p>
            
            <p>
            You have been invited to join <strong>${businessName}</strong> on
            Luminary Pass.
            </p>
            
            <p>
            Before you can access your account, please complete your profile by
            setting your name and password.
            </p>
            
            <p style="margin:30px 0;">
                <a
                    href="${setupLink}"
                    style="
                        background:#4F46E5;
                        color:#fff;
                        text-decoration:none;
                        padding:12px 24px;
                        border-radius:6px;
                        display:inline-block;
                    "
                >
                    Complete Profile
                </a>
            </p>
            
            <p>
            If the button doesn't work, copy and paste the following link into your
            browser:
            </p>
            
            <p>${setupLink}</p>
            
            <p>
            This invitation link will expire in <strong>24 hours</strong>.
            </p>
            
            <p>
            If you were not expecting this invitation, you can safely ignore this
            email.
            </p>
            
            <p>
            Thank you,<br>
            Luminary Pass Team
            </p>
        `,
        });
    }
}

export default new EmailService();