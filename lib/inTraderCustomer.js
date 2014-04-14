'use strict';

function inTraderCustomer() {
    var ID = '',
        firstName = '',
        lastName = '',
        customerNumber = '',
        pinNumber= '',
        address= '',
        address2= '',
        zip = '',
        city = '',
        country= '',
        countryCode = '',
        deliveryAddress = '',
        deliveryZip = '',
        deliveryCity = '',
        email = '',
        mobileNumber= '',
        company = '',
        vatNumber = '';

    this.ID = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                ID = name;
            }
        }
        return ID;
    }


    this.firstName = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                firstName = name;
            }
        }
        return firstName;
    }

    this.lastName = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                lastName = name;
            }
        }
        return lastName;
    }

    this.customerNumber = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                customerNumber = name;
            }
        }
        return customerNumber;
    }

    this.pinNumber = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                pinNumber = name;
            }
        }
        return pinNumber;
    }

    this.address = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                address = name;
            }
        }
        return address;
    }

    this.address2 = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                address2 = name;
            }
        }
        return address2;
    }

    this.zip = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                zip = name;
            }
        }
        return zip;
    }

    this.city = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                city = name;
            }
        }
        return city;
    }

    this.country = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                country = name;
            }
        }
        return country;
    }

    this.countryCode = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                countryCode = name;
            }
        }
        return countryCode;
    }

    this.deliveryAddress = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                deliveryAddress = name;
            }
        }
        return deliveryAddress;
    }

    this.deliveryCity = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                deliveryCity = name;
            }
        }
        return deliveryCity;
    }

    this.deliveryZip = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                deliveryZip = name;
            }
        }
        return deliveryZip;
    }

    this.mobileNumber = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                mobileNumber = name;
            }
        }
        return mobileNumber;
    }

    this.email = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                email = name;
            }
        }
        return email;
    }

    this.company = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                company = name;
            }
        }
        return company;
    }

    this.vatNumber = function(name) {
        if(name) {
            if(typeof name == 'string' || name instanceof String) {
                vatNumber = name;
            }
        }
        return vatNumber;
    }

    this.name = function() {
        return firstName + ' ' + lastName;
    }

};

if (typeof module !== 'undefined') {
    module.exports = inTraderCustomer;
}
