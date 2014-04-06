'use strict';

function inTraderItem() {
    var ID = 0,
        qty = 0,
        price = 0,
        weight = 0,
        itemNumber = '';

    /*{'ID' : [] ,'artNr' : 'product_1', 'price': 12.5, 'weight': 120}*/

    for (var i = 0, j = arguments.length; i < j; i++){
        //document.write(arguments[i]+' ');
    }

    this.ID = function(val) {
        if(val) {
            if(typeof val == 'number' || val instanceof Number) {
                ID = val;
            }
        }
        return ID;
    }

    this.price = function(val) {
        if(val) {
            if(typeof val == 'number' || val instanceof Number) {
                price = val;
            }
        }
        return price;
    }

    this.weight = function(val) {
        if(val) {
            if(typeof val == 'number' || val instanceof Number) {
                weight = val;
            }
        }
        return weight;
    }

    this.qty = function(val) {
        if(val) {
            if(typeof val == 'number' || val instanceof Number) {
                qty = val;
            }
        }
        return qty;
    }

    this.itemNumber = function(val) {
        if(val) {
            if(typeof val == 'string' || val instanceof String) {
                itemNumber = val;
            }
        }
        return itemNumber;
    }
}

if (typeof module !== 'undefined') {
    module.exports = inTraderItem;
}
