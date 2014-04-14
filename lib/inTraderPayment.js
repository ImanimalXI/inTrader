'use strict';

function inTraderPayment() {
    var registered = false,
        method = '',
        fee = 0,
        text = '';

    this.registered = function(val) {
        if(val) {
            if(typeof val == 'boolean' || val instanceof Boolean) {
                registered = val;
            }
        }
        return registered;
    } ,

        this.method = function(val) {
            if(val) {
                if(typeof val == 'string' || val instanceof String) {
                    method = val;
                }
            }
            return method;
        }

    this.fee = function(val) {
        if(val) {
            if(typeof val == 'number' || val instanceof Number) {
                fee = val;
            }
        }
        return fee;
    }

    this.text = function(val) {
        if(val) {
            if(typeof val == 'string' || val instanceof String) {
                text = val;
            }
        }
        return text;
    }
}

if (typeof module !== 'undefined') {
    module.exports = inTraderPayment;
}
