const router = require("express").Router();
const StellarSdk = require("stellar-sdk");
const axios = require("axios");



router.get("/", async (req, res) => {
 

  
  return res.json(result);
});

module.exports = router;
