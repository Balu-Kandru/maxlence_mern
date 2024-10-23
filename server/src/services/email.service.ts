import nodemailer from 'nodemailer';
import config from '../config/index.config';

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail(mailOptions: MailOptions){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email.emailId,
            pass: config.email.pass,
        },
    });

    await transporter.sendMail(mailOptions);
}

export async function sendWelcomeEmail(email: string, confirmationLink: string) {
    const mailOptions = {
        from: config.email.emailId,
        to: email,
        subject: 'Welcome! Please confirm your account',
        html: `<p>Thank you for registering! Please confirm your account by clicking the link below:</p>
               <a href="${confirmationLink}">Confirm your account</a>`,
    };
    await sendEmail(mailOptions);
}

export async function sendForgotPasswordEmail(email: string, resetLink: string) {
    const mailOptions = {
        from: config.email.emailId,
        to: email,
        subject: 'Reset Your Password',
        html: `<p>Click the link below to reset your password:</p>
               <a href="${resetLink}">Reset Password</a>`,
    };
    await sendEmail(mailOptions);
}

