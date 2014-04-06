var should = require('should');
var inTrader = require('../lib/inTrader.js');
var inTraderItem = require('../lib/inTraderItem.js');
var inTraderCurrency = require('../lib/inTraderCurrency.js');
var inTraderShipment = require('../lib/inTraderShipment.js');

describe('inTrader', function() {

    it('should exist', function(){
        var cart = new inTrader();
        cart.should.be.an.instanceOf(Object);
        cart.should.be.an.instanceof(inTrader);
    });

    it('it should have a order date', function(){
        var cart = new inTrader();
        cart.should.have.property('orderDate');
        cart.orderDate().should.be.an.instanceOf(Date);
    });

    it('it should be able to set a custom order date', function(){
        var cart = new inTrader();
        cart.should.have.property('orderDate');
        cart.orderDate().should.be.an.instanceOf(Date);
        cart.orderDate().setDate(20);
        cart.orderDate().setMonth(2);
        cart.orderDate().setFullYear(1999);
        cart.orderDate().should.be.an.instanceOf(Date);
        cart.orderDate().toDateString().should.equal('Sat Mar 20 1999');
    });

    it('it should have a expiry date', function(){
        var cart = new inTrader();
        cart.should.have.property('expiryDate');
        cart.expiryDate().should.be.an.instanceOf(Date);

        var aDate = new Date();
        aDate.setDate(aDate.getDate() + 10);
        cart.expiryDate().getDate().should.equal(aDate.getDate());
        cart.expiryDate().getMonth().should.equal(aDate.getMonth());
        cart.expiryDate().getFullYear().should.equal(aDate.getFullYear());
    });

    it('it should be able to set a custom expiry date', function() {
        var cart = new inTrader();
        cart.should.have.property('orderDate');
        cart.expiryDate().should.be.an.instanceOf(Date);
        cart.expiryDate().setDate(11);
        cart.expiryDate().setMonth(5);
        cart.expiryDate().setFullYear(2015);
        cart.expiryDate().should.be.an.instanceOf(Date);
        cart.expiryDate().toDateString().should.equal('Thu Jun 11 2015');
    });


    it('it should have an invoice number', function(){
        var cart = new inTrader();
        var dateNow = new Date();
        var res = dateNow.toISOString().slice(0,10).replace(/-/g,"") + dateNow.getHours() + dateNow.getMinutes();

        cart.should.have.property('invoiceNumber');
        cart.invoiceNumber().should.equal('I-' + res);
        cart.invoiceNumber().should.be.a.String;
        cart.invoiceNumber().length.should.be.above(5);

        cart.invoiceNumber('NewNumber1234');
        cart.invoiceNumber().should.equal('NewNumber1234');

        cart.invoiceNumber().should.be.type('string');
        cart.invoiceNumber().length.should.be.above(5);
    });

    it('it should have an order number', function(){
        var cart = new inTrader();
        var dateNow = new Date();
        var res = dateNow.toISOString().slice(0,10).replace(/-/g,"") + dateNow.getHours() + dateNow.getMinutes();

        cart.should.have.property('orderNumber');
        cart.orderNumber().should.equal('O-' + res);

        cart.orderNumber('NewNumber1234');
        cart.orderNumber().should.equal('NewNumber1234');

        cart.orderNumber().should.be.type('string');
        cart.orderNumber().length.should.be.above(5);
    });

    it('should have a sub total including item total', function(){
        var cart = new inTrader();
        cart.should.have.property('subTotal');
        cart.should.have.property('itemTotal');
        cart.subTotal().should.be = '0';
        cart.itemTotal().should.be = '0';
        cart.subTotal().should.not.be.below(0);
        cart.subTotal().should.not.be.NaN;
        cart.subTotal().should.be.a.function;
        cart.itemTotal().should.not.be.below(0);
        cart.itemTotal().should.not.be.NaN;
        cart.itemTotal().should.be.a.function;
    });

    it('should have a total weight', function(){
        var cart = new inTrader();
        cart.should.have.property('weight');
        cart.weight().should.not.be.below(0);
        cart.weight().should.be.a.Number;

        //TODO handle incorrect weitht values
    });

    it('should have VAT amout and rate', function(){
        var cart = new inTrader();

        cart.should.have.property('vat');
        cart.vat().should.have.property('rate');

        cart.vat().rate(0.25);
        cart.vat().rate().should.not.be.below(0);
        cart.vat().rate().should.not.be.NaN;
        cart.vat().rate().should.be.a.Number;
    });

    it('should have a Customer with ID, first name and last name', function(){
        var cart = new inTrader();
        cart.should.have.property('customer');
        cart.customer().should.have.property('ID');
        cart.customer().should.have.property('firstName');
        cart.customer().should.have.property('lastName');
        //cart.should.have.keys('foo', 'baz');
    });

    it('Customer should have a set of customer fields', function(){
        var cart = new inTrader();
        cart.should.have.property('customer');
        cart.customer().should.have.property('customerNumber');
        cart.customer().should.have.property('pinNumber');
        cart.customer().should.have.property('address');
        cart.customer().should.have.property('address2');
        cart.customer().should.have.property('zip');
        cart.customer().should.have.property('city');
        cart.customer().should.have.property('country');
        cart.customer().should.have.property('countryCode');
        cart.customer().should.have.property('deliveryAddress');
        cart.customer().should.have.property('deliveryZip');
        cart.customer().should.have.property('deliveryCity');
        cart.customer().should.have.property('email');
        cart.customer().should.have.property('mobileNumber');
        cart.customer().should.have.property('company');
        cart.customer().should.have.property('vatNumber');
        //cart.should.have.keys('foo', 'baz');
    });

    it('should return Customer first and last name as name', function(){
        var cart = new inTrader();
        cart.customer().firstName('Sten-�ke');
        cart.customer().lastName('Cederr��k');
        cart.customer().name().should.equal(cart.customer().firstName() + ' ' + cart.customer().lastName());
        cart.customer().name().should.equal('Sten-�ke Cederr��k');
    });

    it('should handle incorrect values for Customer name', function(){
        var cart = new inTrader();
        cart.customer().firstName('Sten-�ke');
        cart.customer().lastName('Cederr��k');
        cart.customer().name().should.equal(cart.customer().firstName() + ' ' + cart.customer().lastName());
        cart.customer().name().should.equal('Sten-�ke Cederr��k');
        cart.customer().name().should.be.a.String;

        cart.customer().firstName(100);
        cart.customer().lastName({});
        cart.customer().firstName().should.be.a.String;
        cart.customer().lastName().should.be.a.String;
        cart.customer().name().should.be.a.String;
    });

    it('it should have payment method', function(){
        var cart = new inTrader();
        cart.payment().method('PayPal');
        cart.payment().registered(false);
        cart.payment().fee (0.1);
        cart.payment().text('How to pay with paypal');
        cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 10, 'weight': 120});

        cart.should.have.property('payment');
        cart.payment().registered().should.be.false;
        cart.payment().method().should.be = 'PayPal';
        cart.payment().fee().should.be = 0.1;
        cart.payment().text().should.be = 'How to pay with paypal';
        cart.subTotal().should.be = 10.1;

        cart.subTotal().should.not.be.below(0);
        cart.subTotal().should.be.a.function;
    });

    it('should have a Shipment setting with fee and zone', function(){
        var cart = new inTrader();

        cart.shipment().fee(30);
        cart.subTotal().should.be = 30;

        cart.shipment().fee().should.not.be.below(0);
        //TODO set zone make sure it's a number
    });

    it('it should be able to add item', function(){
        var cart = new inTrader();
        cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 12.5, 'weight': 120});
        cart.items().length.should.equal(1);
        cart.items()[0].ID().should.be = 101;
        cart.items()[0].itemNumber().should.be = 'product_1';
        cart.items()[0].price().should.be = 12.5;
        cart.items()[0].weight().should.be = 120;

        cart.addItem({});
        cart.items()[1].should.have.property('ID');
        cart.items()[1].should.have.property('price');

        cart.items()[1].price().should.not.be.below(0);
        cart.items()[1].price().should.be.a.Number;
    });

    it('it should be able to add a inTraderItem', function(){
        var cart = new inTrader();
        var item = new inTraderItem();

        item.ID(101);
        item.itemNumber('product_1');
        item.price(12.5);
        item.weight(120);
        cart.addItem(item);

        cart.items().length.should.equal(1);
        cart.items()[0].ID().should.be = 101;
        cart.items()[0].itemNumber().should.be = 'product_1';
        cart.items()[0].price().should.be = 12.5;
        cart.items()[0].weight().should.be = 120;
    });

    it('it should be able to add a inTraderCurrency', function(){
        var cart = new inTrader();
        var currency = new inTraderCurrency();

        currency.code('USD');
        currency.rate(1);
        currency.symbol('$');
        cart.addCurrency(currency);
        cart.currencies().length.should.equal(1);
    });

    it('it should be able to add a inTraderShipment', function(){
        var cart = new inTrader();
        var shipment = new inTraderShipment();

        shipment.method('USD');
        shipment.fee(1);
        shipment.zone('$');
        cart.shipment(shipment);

        cart.shipment().should.be.a.Object;
        cart.shipment().should.have.property('method');
        cart.shipment().should.have.property('fee');
        cart.shipment().should.have.property('zone');
        cart.shipment().method().should.be.a.String;
        cart.shipment().zone().should.be.a.String;
        cart.shipment().fee().should.be.a.Number;

    });

    it('it should be able to add a inTraderPayment', function(){

    });

    it('it should be able to handle an incorrect item', function(){
        var cart = new inTrader();
        cart.addItem({'ID' : [] ,'itemNumber' : 'product_1', 'price': 12.5, 'weight': 120});

        cart.items().length.should.equal(1);
        cart.items()[0].should.have.property('ID');
        cart.items()[0].itemNumber().should.be = 'product_1';
        cart.items()[0].ID().should.be.a.Number;

        cart.addItem({'ID' : {} ,'itemNumber' : 'product_2', 'price': 12.5, 'weight': 120});
        cart.items().length.should.equal(2);
        cart.items()[1].should.have.property('ID');
        cart.items()[1].itemNumber().should.be = 'product_2';
        cart.items()[1].ID().should.be.a.Number;

        cart.addItem({'ID' : 'abc12' ,'itemNumber' : 'product_3', 'price': '12.5', 'weight': 120});
        cart.items().length.should.equal(3);
        cart.items()[2].should.have.property('itemNumber');
        cart.items()[2].should.have.property('price');
        cart.items()[2].price().should.be = 12.5;
        cart.items()[2].itemNumber().should.be = 'product_3';
        cart.items()[2].price().should.be.a.Number;

        cart.addItem({'ID' : 'cbd854' ,'itemNumber' : 'product_4', 'price': 'zero', 'weight': 120});
        cart.items().length.should.equal(4);
        cart.items()[3].should.have.property('itemNumber');
        cart.items()[3].should.have.property('price');
        cart.items()[3].price().should.be = 0;
        cart.items()[3].itemNumber().should.be = 'product_4';
        cart.items()[3].price().should.be.a.Number;

        cart.addItem({'ID' : 'abc12' ,'itemNumber' : 'product_4', 'price': 100, 'qty': -8});
        cart.items().length.should.equal(5);
        cart.items()[4].should.have.property('itemNumber');
        cart.items()[4].should.have.property('qty');
        cart.items()[4].qty().should.be = 0;
        cart.items()[4].itemNumber().should.be = 'product_4';
        cart.items()[4].qty().should.be.a.Number;

        cart.items()[4].qty('a');
        cart.items()[4].qty().should.be.a.Number;
        cart.items()[4].qty().should.be = 0;

        cart.subTotal().should.be = 137.5;

    });

    it('it should be able to handle incorrect order date', function(){
        var cart = new inTrader();

        cart.orderDate([]);
        cart.orderDate().should.be.an.instanceOf(Date);

        cart.orderDate('');
        cart.orderDate().should.be.an.instanceOf(Date);

        cart.orderDate({});
        cart.orderDate().should.be.an.instanceOf(Date);
    });

    it('it should be able to handle incorrect expiry date', function(){
        var cart = new inTrader();

        cart.expiryDate([]);
        cart.expiryDate().should.be.an.instanceOf(Date);

        cart.expiryDate('');
        cart.expiryDate().should.be.an.instanceOf(Date);

        cart.expiryDate({});
        cart.expiryDate().should.be.an.instanceOf(Date);
    });

    it('it should be able to handle an incorrect payment values', function(){
        var cart = new inTrader();

        cart.payment().should.be.a.Object;
        cart.payment().should.have.property('registered');
        cart.payment().should.have.property('method');
        cart.payment().should.have.property('fee');
        cart.payment().should.have.property('text');
        cart.payment().method().should.be.a.String;
        cart.payment().text().should.be.a.String;
        cart.payment().fee().should.be.a.Number;
        cart.payment().registered().should.be.a.Boolean;

        cart.payment().method([]);
        cart.payment().text([]);
        cart.payment().fee([]);
        cart.payment().registered().should.be.a.Boolean;
        cart.payment().method().should.be.a.String;
        cart.payment().text().should.be.a.String;
        cart.payment().fee().should.be.a.Number;

        cart.payment().method ({});
        cart.payment().text({});
        cart.payment().fee({});
        cart.payment().registered().should.be.a.Boolean;
        cart.payment().method().should.be.a.String;
        cart.payment().text().should.be.a.String;
        cart.payment().fee().should.be.a.Number;

        cart.payment().method(1);
        cart.payment().method(1);
        cart.payment().text(12.5);
        cart.payment().fee('free for all');
        cart.payment().registered().should.be.a.Boolean;
        cart.payment().method().should.be.a.String;
        cart.payment().text().should.be.a.String;
        cart.payment().fee().should.be.a.Number;

        cart.payment([]);
        cart.payment().should.be.a.Object;
        cart.payment().should.have.property('registered');
        cart.payment().should.have.property('method');
        cart.payment().should.have.property('fee');
        cart.payment().should.have.property('text');

        cart.payment('not available');
        cart.payment().should.be.a.Object;
        cart.payment().should.have.property('registered');
        cart.payment().should.have.property('method');
        cart.payment().should.have.property('fee');
        cart.payment().should.have.property('text');

        cart.payment({});
        cart.payment().should.be.a.Object;
        cart.payment().should.have.property('registered');
        cart.payment().should.have.property('method');
        cart.payment().should.have.property('fee');
        cart.payment().should.have.property('text');

    });

    it('it should be able to handle an incorrect shipment values', function(){
        var cart = new inTrader();

        cart.shipment().should.be.a.Object;
        cart.shipment().should.have.property('method');
        cart.shipment().should.have.property('fee');
        cart.shipment().should.have.property('zone');
        cart.shipment().method().should.be.a.String;
        cart.shipment().zone().should.be.a.String;
        cart.shipment().fee().should.be.a.Number;

        cart.shipment().method([]);
        cart.shipment().zone([]);
        cart.shipment().fee([]);
        cart.shipment().method().should.be.a.String;
        cart.shipment().zone().should.be.a.String;
        cart.shipment().fee().should.be.a.Number;

        cart.shipment().method({});
        cart.shipment().zone({});
        cart.shipment().fee({});
        cart.shipment().method().should.be.a.String;
        cart.shipment().zone().should.be.a.String;
        cart.shipment().fee().should.be.a.Number;

        cart.shipment().method(1);
        cart.shipment().fee('xb');
        cart.shipment().zone('Bolivia');
        cart.shipment().fee('free for all');
        cart.shipment().method().should.be.a.String;
        cart.shipment().zone().should.be.a.String;
        cart.shipment().fee().should.be.a.Number;

        cart.shipment([]);
        cart.shipment().should.be.a.Object;
        cart.shipment().should.have.property('method');
        cart.shipment().should.have.property('fee');
        cart.shipment().should.have.property('zone');

        cart.shipment('not available');
        cart.shipment().should.be.a.Object;
        cart.shipment().should.have.property('method');
        cart.shipment().should.have.property('fee');
        cart.shipment().should.have.property('zone');

        cart.shipment({});
        cart.shipment().should.be.a.Object;
        cart.shipment().should.have.property('method');
        cart.shipment().should.have.property('fee');
        cart.shipment().should.have.property('zone');

    });

    it('it should be able to handle an incorrect vat rates', function(){
        var cart = new inTrader();

    });

    it('it should be able to remove item', function(){
        var cart = new inTrader();
        cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 12.5, 'weight': 120});
        cart.addItem({'ID' : 102});
        cart.removeItem({'ID' : 101});
        cart.items().length.should.equal(1);

        cart.removeItem({'ID' : 'missing'});
        cart.items().length.should.equal(1);

        cart.removeItem({'ID' : 102});
        cart.items().length.should.equal(0);
    });

    it('it should be possible to update item', function(){
        var cart = new inTrader();
        cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 12.5, 'weight': 120});
        cart.updateItem({'ID' : 101, 'itemNumber' : 'product_1_updated', 'price': 125.5, 'weight': 120});

        cart.items().length.should.equal(1);
        cart.items()[0].ID().should.equal(101);
        cart.items()[0].itemNumber().should.equal('product_1_updated');
        cart.items()[0].price().should.equal(125.5);
        cart.items()[0].weight().should.equal(120);
    });

    it('it should be possible to reset cart', function(){
        var cart = new inTrader();
        cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 12.5, 'weight': 120});
        cart.addItem({'ID' : 102, 'itemNumber' : 'product_2', 'price': 22.5, 'weight': 120});
        cart.reset();

        cart.subTotal().should.be = 0;
        cart.itemTotal().should.be = 0;
        cart.weight().should.be = 0;
        cart.items().length.should.be = 0;
        cart.shipment().fee().should.be = 0;
        cart.payment().fee().should.be = 0;
        cart.customer().should.be.a.Object;
        //TODO clear
    });

    it('should have a currency', function(){
        var cart = new inTrader();
        cart.should.have.property('baseCurrency');
        cart.should.have.property('currencies');
        cart.currencies().length.should.equal(0);

        cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 12.5, 'weight': 120})

        cart.itemTotal.should.be = 12.5;
    });

    it('it should be able to add currency', function(){
        var cart = new inTrader();
        cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 12.5, 'weight': 120});

        cart.addCurrency({'code' : 'SEK', 'rate' : 1});
        cart.currencies().length.should.equal(1);

        cart.addCurrency({'code' : 'EUR', 'rate' : 0.11368, 'symbol': '�'});
        cart.addCurrency({'code' : 'GBP', 'rate' : 0.093750761});
        cart.currencies().length.should.equal(3);

        cart.itemTotal('SEK').should.be = 12.5;
        cart.itemTotal('EUR').should.be = 1.421;
        cart.itemTotal('GBP').should.be = 1.17188451;

        cart.baseCurrency('EUR');
        cart.itemTotal.should.be = 1.421;
        cart.baseCurrency('GBP');
        cart.itemTotal.should.be = 1.17188451;
    });

    it('it should be able to remove currency', function(){
        var cart = new inTrader();
        cart.addCurrency({'code' : 'EUR', 'rate' : 0.11368, 'symbol': '�'});
        cart.addCurrency({'code' : 'GBP', 'rate' : 0.093750761});

        cart.removeCurrency('EUR');
        cart.currencies().length.should.equal(1);

        cart.removeCurrency('NON');
        cart.currencies().length.should.equal(1);

        cart.removeCurrency('GBP');
        cart.currencies().length.should.equal(0);
        // TODO Make sure the base currency is a string lenght of 3 chars and in upper case
    });

    it('it should be possible to update currency', function(){
        var cart = new inTrader();
        cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 12.5, 'weight': 120});
        cart.addCurrency({'code' : 'EUR', 'rate' : 1.11368, 'symbol': '�'});
        cart.itemTotal.should.be = 13.921;

        cart.updateCurrency({'code' : 'EUR', 'rate' : 1.21368});

        cart.currencies().length.should.equal(1);
        cart.currencies()[0].code().should.equal('EUR');
        cart.currencies()[0].rate().should.equal(1.21368);

        cart.itemTotal.should.be = 15.171;
    });

    //TODO add promo code
    //TODO add discount

});