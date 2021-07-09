const router = require('express').Router();
const acount = require('./acount.js')


router.use('/createWallet', acount)


module.exports= router;   