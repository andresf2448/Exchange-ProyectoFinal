const router = require('express').Router();
const toml = require('toml');
const fs = require('fs');

const stellar = require('../payment/payment')

router.get('/', (req, res, next) => {
    const config = toml.parse(fs.readFileSync('./src/routes/toml/stellar.toml','utf-8'));
    res.send(config);
})

module.exports = router;