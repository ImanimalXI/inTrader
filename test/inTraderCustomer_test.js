var inTraderCustomer = require('../lib/inTraderCustomer.js');

describe('inTraderCustomer', function() {

    it('should exist', function(){
        var customer = new inTraderCustomer();
        customer.should.be.an.instanceOf(Object);
        customer.should.be.an.instanceof(inTraderCustomer);
    });

    it('should handle valid email', function(){
        var customer = new inTraderCustomer();

        customer.email('nonvalid');
        customer.email().should.equal('');

        customer.email('the.test@gmail.com');
        customer.email().should.equal('the.test@gmail.com');



        customer.email('the.test@.gmail.com');
        customer.email().should.equal('the.test@gmail.com');
    });

    it('should handle country code', function(){
        var customer = new inTraderCustomer();

        customer.countryCode('nonvalid');
        customer.countryCode().should.equal('');

        customer.countryCode('se');
        customer.countryCode().should.equal('se');
    });

});