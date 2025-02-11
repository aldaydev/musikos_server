import nodemailer from 'nodemailer'; 
// import dotenv from 'dotenv';
// dotenv.config();


// const email = process.env.MAILER_EMAIL;
// const pass = process.env.MAILER_PASS;

// Crear un objeto de transporte
const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: process.env.MAILER_SECURE,
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASS,
    },
});

export default transporter;