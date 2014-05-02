'use strict';

/*!
 * inTrader
 * Copyright(c) imanimalxi, Maximilian Moulettes
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var inTraderPayment = require('./inTraderPayment');
var inTraderCustomer = require('./inTraderCustomer');
var inTraderShipment = require('./inTraderShipment');
var inTraderCurrency = require('./inTraderCurrency');
var inTraderItem = require('./inTraderItem');

function VAT(val) {
    var rate = val;

    this.rate = function(val) {
        if(val) {
            if(typeof val == 'number' || val instanceof Number) {
                rate = val;
            }
        }
        return rate;
    }
}

function inTrader() {
    var orderDate = new Date(),
        expiryDate = new Date(),
        invoiceNumber = '',
        orderNumber = '',
        weight = 0,
        payment = new inTraderPayment(),
        shipment = new inTraderShipment(),
        customer = new inTraderCustomer(),
        vat = new VAT(0.25),
        baseCurrency = '',
        itemTotal = 0,
        currencies = [],
        items = [],

         availableCurrency = function(currencyCode) {

            for (var i =0; i < currencies.length; i++) {
                if (currencies[i].code() === currencyCode) {
                    return true;
                }
            }
            return false;

         },

        getCurrency = function(currencyCode) {

            for (var i =0; i < currencies.length; i++) {
                if (currencies[i].code() === currencyCode) {
                    return currencies[i];
                }
            }
            return false;

        }

    this.orderDate = function(val) {
        if(val) {
            if(typeof val == 'object' && val instanceof Date) {
                orderDate = val;
            }
        }
        return orderDate;
    }

    this.expiryDate = function(val) {
        if(val) {
            if(typeof val == 'object' && val instanceof Date) {
                expiryDate = val;
            }
        }
        return expiryDate;
    }

    this.invoiceNumber = function(val) {
        if(val) {
            if(typeof val == 'string' || val instanceof String) {
                invoiceNumber = val;
            }
        }
        return invoiceNumber;
    }

    this.orderNumber = function(val) {
        if(val) {
            if(typeof val == 'string' || val instanceof String) {
                orderNumber = val;
            }
        }
        return orderNumber;
    }

    this.payment = function(val) {
        if(val) {
            if(typeof val == 'object' && val instanceof inTraderPayment) {
                payment = val;
            }
        }
        return payment;
    }

    this.customer = function(val) {
        if(val) {
            if(typeof val == 'object' && val instanceof inTraderCustomer) {
                customer = val;
            }
        }
        return customer;
    }

    this.shipment = function(val) {
        if(val) {
            if(typeof val == 'object' && val instanceof inTraderShipment) {
                shipment = val;
            }
        }
        return shipment;
    }

    this.vat = function(val) {
        if(val) {
            if(typeof val == 'object' && val instanceof VAT) {
                vat = val;
            }
        }
        return vat;
    }

    this.baseCurrency = function(val) {
        if(val) {
            if(typeof val == 'string' || val instanceof String) {
                baseCurrency = val;
            }
        }
        return baseCurrency;
    }


    this.currencies = function(val) {
        if(val) {
           // if(typeof val == 'string' || val instanceof String) {
                currencies = val;
            //}
        }
        return currencies;
    }

    this.items = function(val) {
        if(val) {
            if(typeof val == 'string' || val instanceof String) {
                items = val;
            }
        }
        return items;
    }

    this.init = function() {
       var expiryDate = new Date();
       expiryDate.setDate(expiryDate.getDate() + 10);
       this.expiryDate(expiryDate);
       this.setInvoiceNumber();
       this.setOrderNumber();
    };

    this.addCurrency = function(currency) {
        if(typeof currency == 'object' || currency instanceof Object) {
            var newCurrency = new inTraderCurrency();
            if(currency.code){
                newCurrency.code(currency.code);
            }
            if(currency.rate){
                newCurrency.rate(currency.rate);
            }
            if(currency.symbol){
                newCurrency.symbol(currency.symbol);
            }
            this.currencies().push(newCurrency);
            //Set first added currency as baseCurrency
            if(this.currencies().length == 1) {
                this.baseCurrency(currency.code);
            }
            return true;
        } else {
            return false;
        }
    };

    this.removeCurrency = function(currencyCode) {
        if(currencyCode) {
            for (var i =0; i < this.currencies().length; i++) {
                if (this.currencies()[i].code() === currencyCode) {
                    this.currencies().splice(i,1);
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    };


    this.updateCurrency = function(currency) {
        if(currency.code) {
            for (var i =0; i < this.currencies().length; i++) {
                if (this.currencies()[i].code() === currency.code) {
                    var newCurrency = new inTraderCurrency();
                    if(currency.code){
                        newCurrency.code(currency.code);
                    }
                    if(currency.rate){
                        newCurrency.rate(currency.rate);
                    }
                    if(currency.symbol){
                        newCurrency.symbol(currency.symbol);
                    }
                    this.currencies()[i] = newCurrency;
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    };

    this.addItem = function(item) {
        if( item instanceof inTraderItem) {
            this.items().push(item);
        }
        else if(typeof item == 'object' || item instanceof Object ) {
            var newItem = new inTraderItem();
            if(item.ID){
                newItem.ID(item.ID);
            }
            if(item.price){
                newItem.price(item.price);
            }
            if(item.itemNumber){
                newItem.itemNumber(item.itemNumber);
            }
            if(item.weight){
                newItem.weight(item.weight);
            }
            if(item.qty){
                newItem.qty(item.qty);
            }
            this.items().push(newItem);
            return true;
        } else {
            return false;
        }
    };

    this.removeItem = function(item) {
        if(item.ID) {
            for (var i =0; i < this.items().length; i++) {
                if (this.items()[i].ID() === item.ID) {
                    this.items().splice(i,1);
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    };

    this.updateItem = function(item) {
        if(item.ID) {
            for (var i =0; i < this.items().length; i++) {
                if (this.items()[i].ID() === item.ID) {
                    var newItem = new inTraderItem;
                    if(item.ID){
                        newItem.ID(item.ID);
                    }
                    if(item.price){
                        newItem.price(item.price);
                    }
                    if(item.itemNumber){
                        newItem.itemNumber(item.itemNumber);
                    }
                    if(item.weight){
                        newItem.weight(item.weight);
                    }
                    if(item.qty){
                        newItem.qty(item.qty);
                    }
                    this.items()[i] = newItem;
                    return true;
                }
            }
            return false;
        } else {
        }
    };

    this.setInvoiceNumber = function(nr) {
        if(nr) {
            this.invoiceNumber(nr);
        } else {
            var aDate = new Date();
            var res = aDate.toISOString().slice(0,10).replace(/-/g,"") + aDate.getHours() + aDate.getMinutes();
            this.invoiceNumber('I-' + res);
        }
    };

    this.setOrderNumber = function(nr) {
        if(nr) {
            this.orderNumber(nr);
        } else {
            var aDate = new Date();
            var res = aDate.toISOString().slice(0,10).replace(/-/g,"") + aDate.getHours() + aDate.getMinutes();
            this.orderNumber('O-' + res);
        }
    };

    this.reset = function() {
        var c = new inTraderCustomer,
            s = new inTraderShipment,
            p = new inTraderPayment

        customer = c;
        shipment = s;
        payment = p;
        items = [];

        return true;
    };

    this.totalWeight = function() {
        var weight = 0;
        for (var i =0; i < this.items().length; i++) {
            if (this.items()[i].weight() ) {
                weight += this.items()[i].weight();
            }
        }

        return weight;
    }

    this.itemTotal = function(currencyCode) {
        //return this.items.reduce(function(x,y) {return x+y},0);
        var sum = 0,
            currency = '';
        for (var i =0; i < this.items().length; i++) {
            if (this.items()[i].price() ) {
                if (availableCurrency(currencyCode) && currencyCode != this.baseCurrency) {
                    currency = getCurrency(currencyCode);
                    sum += this.items()[i].price() * currency.rate();
                } else if(this.baseCurrency() != '') {
                    currency = getCurrency(this.baseCurrency());
                    sum += this.items()[i].price() * currency.rate();
                } else {
                    sum += this.items()[i].price();
                }
            }
        }
        itemTotal = sum;
        return sum;
    };

    this.vatTotal = function(currencyCode) {
        if(availableCurrency(currencyCode) && currencyCode != this.baseCurrency) {
            var currency = getCurrency(currencyCode);
            return  this.itemTotal(currencyCode) * this.vat().rate();
        } else if(this.baseCurrency() != '') {
            var currency = getCurrency(this.baseCurrency());
            return this.itemTotal(this.baseCurrency()) * this.vat().rate() ;

        } else {
            return this.itemTotal() * this.vat().rate();
        }


    };

    this.subTotal = function(currencyCode) {
        if(availableCurrency(currencyCode) && currencyCode != this.baseCurrency) {
            var currency = getCurrency(currencyCode);
            return (this.itemTotal() + this.payment().fee() + this.shipment().fee() ) * currency.rate();
        } else if(this.baseCurrency() != '') {
            var currency = getCurrency(this.baseCurrency());
            return (this.itemTotal() + this.payment().fee() + this.shipment().fee() ) * currency.rate();

        } else {
            return this.itemTotal() + this.payment().fee() + this.shipment().fee();
        }
    };

    this.toJSON = function() {
        var cart = {};

        cart.shipment = this.shipment;
        cart.payment = this.payment;
        cart.customer = this.customer();
        cart.vat = {};
        cart.currencies = this.currencies();

        cart.orderDate = this.orderDate();
        cart.expiryDate = this.expiryDate();
        cart.invoiceNumber = this.invoiceNumber();
        cart.orderNumber = this.orderNumber();
        cart.subTotal = this.subTotal();
        cart.itemTotal = this.itemTotal();
        cart.vatTotal = this.vatTotal();
        cart.totalWeight = this.totalWeight();
        cart.baseCurrency = this.baseCurrency();

        cart.shipment.fee = this.shipment().fee();
        cart.shipment.zone = this.shipment().zone();
        cart.shipment.method = this.shipment().method();

        cart.payment.registered = this.payment().registered();
        cart.payment.method = this.payment().method();
        cart.payment.fee = this.payment().fee();
        cart.payment.text = this.payment().text();

        cart.vat.rate = this.vat().rate();

        cart.customer.firstName = this.customer().firstName();
        cart.customer.lastName = this.customer().lastName();
        cart.customer.customerNumber = this.customer().customerNumber();
        cart.customer.pinNumber = this.customer().pinNumber();
        cart.customer.address = this.customer().address();
        cart.customer.address2 = this.customer().address2();
        cart.customer.zip = this.customer().zip();
        cart.customer.city = this.customer().city();
        cart.customer.country = this.customer().country();
        cart.customer.countryCode = this.customer().countryCode();
        cart.customer.deliveryAddress = this.customer().deliveryAddress();
        cart.customer.deliveryZip = this.customer().deliveryZip();
        cart.customer.deliveryCity = this.customer().deliveryCity();
        cart.customer.email = this.customer().email();
        cart.customer.mobileNumber = this.customer().mobileNumber();
        cart.customer.company = this.customer().company();
        cart.customer.vatNumber = this.customer().vatNumber();

        cart.items =  [];

        for(var i=0; i < this.items().length; i++) {
            cart.items.push({
                ID: this.items()[i].ID(),
                itemNumber:this.items()[i].itemNumber() ,
                price:this.items()[i].price(),
                qty:this.items()[i].qty(),
                weight:this.items()[i].weight()
            })
        }

        cart.currencies =  [];

        for(var i=0; i < this.currencies().length; i++) {
            cart.currencies.push({
                rate: this.currencies()[i].rate(),
                code:this.currencies()[i].code() ,
                symbol:this.currencies()[i].symbol()
            })
        }

        var JSONCart = JSON.stringify(cart);

        return JSONCart;
    }

    this.init();
}

if (typeof module !== 'undefined') {
    module.exports = inTrader;
}