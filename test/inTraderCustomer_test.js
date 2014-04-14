var inTraderCustomer = require('../lib/inTraderCustomer.js');

describe('inTraderCustomer', function() {

    it('should exist', function(){
        var customer = new inTraderCustomer();
        customer.should.be.an.instanceOf(Object);
        customer.should.be.an.instanceof(inTraderCustomer);
    });

});