const router = require('express').Router();

module.exports = {
  transaction: require('./transaction/transaction'),
  acount: require('./createWallet/acount'),
  stripe: require('./stripe/stripe'),
  index: router
};