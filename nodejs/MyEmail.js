const nodemailer = require('nodemailer');
class EMail {
    constructor() {
        // Gmail account details
        this.sender = 'karan.bhatt.bhavnagar@gmail.com';

        // Gmail App Password (remove spaces)
        this.password = 'dbtz szjt ogai yrsz'.replace(/\s/g, '');

        // Configure SMTP transporter
        this.MailSender = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: this.sender,
                pass: this.password
            },
            logger: true,
            debug: true
        });

        // Verify SMTP connection
        this.MailSender.verify()
            .then(() => {
                console.log('Email server is ready');
            })
            .catch(error => {
                console.error('Email verification failed:', error);
            });
    }

    // Send Email
    send(receiver, subject, message) {
        this.MailSender.sendMail({
            from: this.sender,
            to: receiver,
            subject: subject,
            html: message
        })
        .then(info => {
            console.log('Email sent successfully:', info.messageId);
        })
        .catch(error => {
            console.error('Email sending failed:', error);
        });
    }
}
module.exports.EMail = EMail;
