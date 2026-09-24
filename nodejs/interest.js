class SimpleInterest{
    constructor(amount,rate,year){
        this.amount = amount;
        this.rate = rate;
        this.year = year;
    }
    getInterest(){
        //local variable 
        let interest = (this.amount * this.rate * this.year) / 100;
        return interest;
    }
}
module.exports = SimpleInterest;