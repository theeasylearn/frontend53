let my_currency = {
    toDollar: function (rupees){
        let dollar = rupees/92;
        return dollar;
    },
    toEuro : function(rupees){
        let euro = rupees/100;
        return euro
    },
    toPound : function(rupees){
        let pound = rupees/110;
        return pound;
    }
}
// export 
module.exports = my_currency;