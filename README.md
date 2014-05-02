# inTrader

## Overview

inTrader is a node shopping cart module for e-commerce integration and
provides the basic web shop cart functionality for online store.
Includes handling of items, currency, weight, payment methods and customer details.

## To begin

 1. Install it:

    ```bash
    $ npm install inTrader --save-dev
    ```

 2. Require it and use:

    ```js
    var should = require('inTrader');

    var cart = new inTrader;
    ```

The inTrader object consists of the following sub components,

Customer,
Payment,
VAT,
Shipment,
Currency,
Items,

# inTrader Functions



## .invoiceNumber
Set or get the order invoice number. A initial number is set when creating the cart
with the following format I-YYYYMMDDHHMM, which is the year, month, day, hour and minute the
cart was initiated.

```js
var cart = new inTrader();
cart.invoiceNumber();   // Will return something similar to this I-YYYMMDDHHMM
cart.invoiceNumber('Invoice01');   // Set the invoice number Invoice01
```

## .orderNumber
Set or get the order number. A initial number is set when creating the cart
with the following format O-YYYYMMDDHHMM, which is the year, month, day, hour and minute the
cart was initiated.

```js
var cart = new inTrader();
cart.orderNumber();   // Will return something similar to this O-201403282210
cart.invoiceNumber('Invoice01');   // Set the invoice number Invoice01
```

## .baseCurrency
Set or get the cart base currency using the 'XXX' format such as EUR, USD, GBP.
The base currency will be used if no currency is set when requesting item and
sub total for order.

```js
var cart = new inTrader();
cart.baseCurrency('USD');   // Set the base currency to USD
cart.baseCurrency();   // fetch the base currency, 'USD' value
```

## .orderDate
Set or get order date. The order date is a regular javascript Date Object

```js
var cart = new inTrader();
cart.orderDate(); // Will return the current Date
cart.orderDate().getDate(); // Will return the order date day of the month
cart.orderDate().getDay(); // Will return the order date day of the week
cart.orderDate().getFullYear(); // Returns the order date year in 4 digits
cart.orderDate().setDate(20); // Set day to 20th day of month
cart.orderDate().setMonth(2); // Set the Month to the March, January is 0, February is 1, and so on
cart.orderDate().setFullYear(1999); // Set order date to year 1999
```

## .expiryDate
Set or get expiry date for order. The expiry date is a regular javascript Data Object to work with dates and times

```js
var cart = new inTrader();
cart.expiryDate(); // Will return the current Date
cart.expiryDate().getDate(); // Will return the order date day of the month
cart.expiryDate().getDay(); // Will return the order date day of the week
cart.expiryDate().getFullYear(); // Returns the order date year in 4 digits
cart.expiryDate().setDate(20); // Set day to 20th day of month
cart.expiryDate().setMonth(2); // Set the Month to the March, January is 0, February is 1, and so on
cart.expiryDate().setFullYear(1999); // Set order date to year 1999
```

## .currencies
Array of the different currencies used in cart

```js
var cart = new inTrader();
cart.currencies();
```

## .items
Array of the order cart item

```js
var cart = new inTrader();
cart.items();
```

## .addItem
Add item to cart

```js
cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 12.5, 'weight': 120});
```

## .removeItem
Remove item from cart

```js
var cart = new inTrader();
cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 12.5, 'weight': 120});
cart.removeItem({'ID' : 101});
```

## .updateItem
Update cart item

```js
var cart = new inTrader();
cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 12.5, 'weight': 120});
cart.updateItem({'ID' : 101, 'itemNumber' : 'product_1_updated', 'price': 125.5, 'weight': 120});
```

## .addCurrency
Add a currency

```js
var cart = new inTrader();
cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 12.5, 'weight': 120})
cart.addCurrency({'code' : 'EUR', 'rate' : 0.11368, 'symbol': '€'});
cart.addCurrency({'code' : 'GBP', 'rate' : 0.093750761});
cart.itemTotal('EUR') //  Item total =1.421;
cart.itemTotal('GBP') // Item total = 1.17188451;
cart.baseCurrency('EUR');
cart.itemTotal // item total = 1.421;
cart.baseCurrency = 'GBP'; // total = 1.17188451;
```

## .removeCurrency
Remove currency

```js
var cart = new inTrader();
cart.addCurrency({'code' : 'EUR', 'rate' : 0.11368, 'symbol': '€'});
cart.addCurrency({'code' : 'GBP', 'rate' : 0.093750761});
cart.removeCurrency('EUR');
```

## .updateCurrency
Update a currency

```js
var cart = new inTrader();
cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 12.5, 'weight': 120});
cart.addCurrency({'code' : 'EUR', 'rate' : 1.11368, 'symbol': '€'});
cart.itemTotal.should.be = 13.921;
cart.updateCurrency({'code' : 'EUR', 'rate' : 1.21368}); //itemTotal = 15.171;
```

## .reset
Reset cart, clear items and reset total to 0

```js
var cart = new inTrader();
cart.reset();
```

## .vatTotal
Return the vat total based on all the items in cart

```js
var cart = new inTrader();
cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 12.5, 'weight': 120});
cart.vat().rate(0.25); //Set the vat rate to 25%
cart.vatTotal() // 3.125,
```

## .itemTotal
Return the total sum of all items in cart

```js
var cart = new inTrader();
cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 12.5, 'weight': 120});
cart.addCurrency({'code' : 'EUR', 'rate' : 1.11368, 'symbol': '€'});
cart.itemTotal() // 13.921, The first added currency will serve as base currency an it's rate will be used to calculate the total (12.5 * 1.11368);
cart.itemTotal('EUR') //13.921, Same as previous since this matches the base currency;

```

## .subTotal
Return the sub total of cart, includes item total and fees for shipment and payment

```js
var cart = new inTrader();
cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 10, 'weight': 120});
cart.payment().method('PayPal');
cart.payment().registered(false);
cart.payment().fee (0.1);
cart.payment().text('How to pay with paypal');
cart.subTotal() // 10.1;
```

## .weight
Returns the total weigh of the cart items

```js
var cart = new inTrader();
cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 10, 'weight': 120});
cart.weight() //120
```

## .toJSON
Return cart in JSON format

```js
var cart = new inTrader();
cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 10, 'weight': 120});
cartJSON = cart.toJSON();
console.log(cartJSON.items[0].itemNumber); // product_1

```

# Customer Functions
Set and get for the following customer values,
ID,
firstName,
lastName,
customerNumber,
pinNumber,
address,
address2,
zip,
city,
country,
countryCode,
deliveryAddress,
deliveryZip,
deliveryCity,
email,
mobileNumber,
company,
vatNumber;

```js
var cart = new inTrader();
cart.customer() // The Customer object
cart.customer().firstName('Sten-Åke');
cart.customer().lastName('Cederröök');
cart.customer().should.have.property('customerNumber');
cart.customer().pinNumber('19891012-1234');
cart.customer().address('vems gata');
cart.customer().address2('c/o');
cart.customer().zip('SE214 24');
cart.customer().city('Xlöv');
cart.customer().country('Sweden');
cart.customer().countryCode('Se');
cart.customer().deliveryAddress('other street');
cart.customer().deliveryZip('');
cart.customer().deliveryCity('');
cart.customer().email('sten-ake@rooken.se');
cart.customer().mobileNumber('1234567');
cart.customer().company('AB Cederrööken');
cart.customer().vatNumber('SE891012123401');
```

# Payment Functions
Set and get for the payment functions
registered,
method,
fee,
text

```js
var cart = new inTrader();
cart.payment().method('PayPal');
cart.payment().registered(false); //Payment has not been registered
cart.payment().fee (0.1);
cart.payment().text('How to pay description');
```

# Currency Functions
Set and get for the payment options
code,
rate,
symbol

```js
var cart = new inTrader();
var currency = new inTraderCurrency();
currency.code('USD');
currency.rate(1);
currency.symbol('$');
cart.addCurrency(currency);
cart.currencies().length.should.equal(1);
```

# Shipment Functions
Set and get for the payment options
method,
fee,
zone

```js
var cart = new inTrader();
cart.shipment().fee(30);
cart.shipment().zone(1);
cart.shipment().method('Regular Post');
```

# VAT Functions

## .rate
Get and set for the cart VAT rate

```js
var cart = new inTrader();
cart.vat().rate(0.25);
```

# Item Functions
Get and set for Item object
ID,
qty,
price,
weight,
itemNumber

```js
var cart = new inTrader();
var item = new inTraderItem();

item.ID(101);
item.itemNumber('product_1');
item.price(12.5);
item.weight(120);
cart.addItem(item);
```

The item can be added directly to cart if you pass the argument as a object
```js
var cart = new inTrader();
cart.addItem({'ID' : 101, 'itemNumber' : 'product_1', 'price': 12.5, 'weight': 120});

#Complete Order
``````js
var cart = new inTrader();

cart.vat().rate(0.25);    // Set the vat rate to 25%

//Add some items to the cart
cart.addItem({'ID' : 1, 'itemNumber' : 'product_1', 'price': 12.5, 'weight': 122});
cart.addItem({'ID' : 2, 'itemNumber' : 'product_2', 'price': 22.5, 'weight': 100});
cart.addItem({'ID' : 3, 'itemNumber' : 'product_3', 'price': 2.5, 'weight': 20});
cart.addItem({'ID' : 4, 'itemNumber' : 'product_4', 'price': 8.75, 'weight': 28});
cart.addItem({'ID' : 5, 'itemNumber' : 'product_5', 'price': 125, 'weight': 1200});

cart.totalWeight(); // 1470;
cart.itemTotal(); // 171.25;
cart.subTotal(); // 171.25;

cart.shipment().fee(75);
cart.payment().fee(4.78);
cart.itemTotal(); // 171.25
cart.subTotal(); // 251.03

cart.vatTotal() // 42.8125

cart.payment().registered(); // false

cart.addCurrency({'code' : 'SEK', 'rate' : 1});
cart.addCurrency({'code' : 'EUR', 'rate' : 0.11368, 'symbol': '€'});
cart.addCurrency({'code' : 'GBP', 'rate' : 0.093750761});
cart.addCurrency({'code' : 'USD', 'rate' : 0.152744});

cart.itemTotal('SEK') // 171.25;
cart.subTotal('SEK') // 251.03;

cart.itemTotal('EUR') // 19.4677;
cart.itemTotal('GBP') // 16.05481782125;
cart.itemTotal('USD') // 26.15741;

cart.subTotal('EUR') // 28.5370904;
cart.subTotal('GBP') // 23.53425353383;
cart.subTotal('USD') // 38.343326319999996;

cart.vatTotal('EUR') // 4.866925;
cart.vatTotal('GBP') // 4.0137044553125;
cart.vatTotal('USD') // 6.5393525;

cart.customer().firstName('Ragnar');
cart.customer().lastName('Röök');
cart.customer().customerNumber('-');
cart.customer().pinNumber('560312-1212');
cart.customer().address('Valhallavägen 7');
cart.customer().address2('c/o Sleipner Johansson');
cart.customer().zip('112 34');
cart.customer().city('Lokeborg');
cart.customer().country('Sweden');
cart.customer().countryCode('se');
cart.customer().deliveryAddress('');
cart.customer().deliveryZip('');
cart.customer().deliveryCity('');
cart.customer().email('ragnar.rook@vhammaren.se');
cart.customer().mobileNumber('0737212345');
cart.customer().company('AB BB');
cart.customer().vatNumber('SE560312121201');

cart.payment().registered(true);

cart.reset();
cart.payment().registered() // false;
```

## Feedback How to Contribute

 1. Fork and edit
 2. Submit pull request for consideration

### Contribute Style Guide

 1. Be clear on your commit messages
 2. Every pull request may not be accepted. Don't blame anybody.