module.exports = function(receiver,subject,message){
    this.receiver = receiver,
    this.subject = subject,
    this.message = message,
    this.sendMail = function(){
        console.log("email has been sent to " + this.receiver);
        console.log("Subject " + this.subject);
        console.log("Mail Content " + this.message);
    }
}