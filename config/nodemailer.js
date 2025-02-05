import nodemailer from 'nodemailer'; 

const email = process.env.GMAIL_EMAIL;
const pass = process.env.GMAIL_PASS;

// Crear un objeto de transporte
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: email,
        pass: pass,
    },
});

export default transporter;