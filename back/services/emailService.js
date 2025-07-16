import nodemailer from 'nodemailer';
import 'dotenv/config'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

async function sendCode(code, email) {
    await transporter.sendMail({
        from: 'Інстаграм реєстрація',
        to: email,
        subject: "Код реєстрації",
        text: `Код реєстрації ${code}`,
        html: `<b>Код реєстрації ${code}</b>`,
    });
}

export const emailService = {
    sendCode
}