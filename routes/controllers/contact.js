// controllers/contact.js (Controller)

const nodemailer = require('nodemailer');

const sendEmail = async (contactData) => {
    console.log(contactData);
    const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, 
            auth: {
                user: "import@rragroup.ca",
                pass: "lf@C5QHz8B$QL9S3"
            }
    });

    try {
        await transporter.sendMail({
            from: 'deepakit.k03@gmail.com',
            to: 'deepakit.k03@gmail.com',
            subject: contactData.subject,
            text: `
                Full Name: ${contactData.fullName}
                Email: ${contactData.email}
                Phone: ${contactData.phone}
                Message:
                ${contactData.message}
            `
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { sendEmail };
