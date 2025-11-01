// 4-pricing.js

import Currency from './3-currency.js';

export default class Pricing {
  constructor(amount, currency) {
    this._amount = amount;
    this._currency = currency;
  }

  // Getter and Setter for amount
  get amount() {
    return this._amount;
  }

  set amount(value) {
    if (typeof value !== 'number') {
      throw new TypeError('amount must be a number');
    }
    this._amount = value;
  }

  // Getter and Setter for currency
  get currency() {
    return this._currency;
  }

  set currency(value) {
    if (!(value instanceof Currency)) {
      throw new TypeError('currency must be a Currency');
    }
    this._currency = value;
  }

  // Method: display full price
  displayFullPrice() {
    return `${this._amount} ${this._currency.name} (${this._currency.code})`;
  }

  // Static method: convert price
  static convertPrice(amount, conversionRate) {
    if (typeof amount !== 'number' || typeof conversionRate !== 'number') {
      throw new TypeError('Both amount and conversionRate must be numbers');
    }
    return amount * conversionRate;
  }
}
