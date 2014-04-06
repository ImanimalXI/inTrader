'use strict';

function inTraderCurrency() {
    var code = '',
        rate = 0,
        symbol = '';

    this.code = function(val) {
        if(val) {
            if(typeof val == 'string' || val instanceof String) {
                code = val;
            }
        }
        return code;
    }

    this.rate = function(val) {
        if(val) {
            if(typeof val == 'number' || val instanceof Number) {
                rate = val;
            }
        }
        return rate;
    }

    this.symbol = function(val) {
        if(val) {
            if(typeof val == 'string' || val instanceof String) {
                symbol = val;
            }
        }
        return symbol;
    }
}

if (typeof module !== 'undefined') {
    module.exports = inTraderCurrency;
}
