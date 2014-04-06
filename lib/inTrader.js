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
        baseCurrency = 'SEK',
        currencies = [],
        items = [];

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

    this.weight = function(val) {
        if(val) {
            if(typeof val == 'string' || val instanceof String) {
                weight = val;
            }
        }
        return weight;
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
        if(typeof item == 'object' || item instanceof Object) {
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
        return true;
    };

    this.itemTotal = function() {
        //return this.items.reduce(function(x,y) {return x+y},0);
        var sum = 0;
        for (var i =0; i < this.items().length; i++) {
            if (this.items()[i].price ) {
                sum += this.items()[i].price;
            }
        }
        return sum;
    };

    this.subTotal = function() {
        return this.itemTotal() + this.payment().fee() + this.shipment().fee();
    };

    this.init();

}

if (typeof module !== 'undefined') {
    module.exports = inTrader;
}