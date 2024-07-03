import nodemailer from "nodemailer"

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const emailOptions = {
        from: `"Urban Bazzar" ${process.env.EMAIL_FROM}`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(emailOptions);
    console.log('Mail sent');
}

export default sendEmail