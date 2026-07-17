import nodemailer from "nodemailer";
import crypto from "crypto";
import { env } from "../../config/env";

import businessRepo from "../../repositories/busines/business.repository.js";


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

    async sendBusinessActivationEmail(email: string, businessCode: string, businessName: string) {

        // console.log("Activation email:", email, businessCode, businessName);
        // Generate activation token
        const token = crypto.randomBytes(32).toString("hex");

        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

        // Save token and expiry in database
        //
        await businessRepo.update(
            {
                business_code: businessCode,
            },
            {
                activation_token: token,
                activation_token_expires_at: expiresAt,
                email_verified: false,
            }
        );

        // console.log("Activation update result:", result);

        const activationLink = `${env.APP_URL}/api/businesses/activate?token=${token}`;

        await this.transporter.sendMail({
            from: `"Luminary Pass" <${env.SMTP_USER}>`,
            to: email,
            subject: "Activate Your Business Account",
            html: `
            <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;line-height:1.6">
                <h2>Welcome to Luminary Pass</h2>

                <p>Hello,</p>

                <p>
                    Your business <strong>${businessName}</strong> has been registered successfully.
                </p>

                <p>
                    Click the button below to activate your account.
                </p>

                <p style="text-align:center;margin:35px 0;">
                    <a
                        href="${activationLink}"
                        style="
                            background:#2563eb;
                            color:#ffffff;
                            padding:14px 30px;
                            text-decoration:none;
                            border-radius:6px;
                            font-weight:bold;
                            display:inline-block;
                        "
                    >
                        Activate Account
                    </a>
                </p>

                <p>
                    If the button doesn't work, copy this URL into your browser:
                </p>

                <p>
                    <a href="${activationLink}">
                        ${activationLink}
                    </a>
                </p>

                <hr>

                <p><strong>Business Code:</strong> ${businessCode}</p>

                <p>
                    This activation link will expire in <strong>24 hours</strong>.
                </p>

                <p>
                    Regards,<br>
                    <strong>Luminary Pass Team</strong>
                </p>
            </div>
            `,
        });

        return token;
    }
}

export default new EmailService();