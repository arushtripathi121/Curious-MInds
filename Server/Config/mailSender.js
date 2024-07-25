const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender = (doc) => {
    let transporter = nodemailer.createTransport({
        host: process.env.mail_host,
        auth: {
            user: process.env.mail_user,
            pass: process.env.mail_pass
        },
    })

    let info = transporter.sendMail({
        from:'Arush Tripathi',
        to:doc.email,
        subject: 'Welcome to Curious minds',
        html:` <h2>Hello</h2><p>Welcome to Curious Minds family</p>`,
    })
    return info;
}

module.exports = mailSender;
