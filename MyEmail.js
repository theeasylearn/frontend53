var nodemailer = require('nodemailer');
class EMail {
    constructor() {
        //set your email address below
        this.sender = 'theeasylearn@gmail.com';
        //set your app specific password
        this.password = 'szch exvm gzqd khzc';
        this.MailSender = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: this.sender,
                pass: this.password,
            },
        });
        this.MailSender.verify().then().catch(console.error);
    }
    send(receiver, subject, message) {
        this.MailSender.sendMail({
            from: `<${this.sender}>`, // sender address
            to: receiver, // list of receivers
            subject: subject, // Subject line
            html: message, // html body
        }).then(info => { }).catch(console.error);
    }
}
module.exports.EMail = EMail;