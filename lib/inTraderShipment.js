'use strict';

function inTraderShipment() {
    var method = '',
        fee = 0,
        zone = '';

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

    this.zone = function(val) {
        if(val) {
            if(typeof val == 'string' || val instanceof String) {
                zone = val;
            }
        }
        return zone;
    }
}

if (typeof module !== 'undefined') {
    module.exports = inTraderShipment;
}
