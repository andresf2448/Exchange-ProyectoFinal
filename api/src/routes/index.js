const router = require('express').Router();

module.exports = {
  info: require('./info/info'),
  transaction: require('./transaction/transaction'),
  payment: require('./payment/payment'),
  acount: require('./createWallet/acount'),
  federation: require('./federation/federation'),
  index: router
};