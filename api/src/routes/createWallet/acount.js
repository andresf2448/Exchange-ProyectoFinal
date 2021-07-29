const router = require("express").Router();
const StellarSdk = require("stellar-sdk");
const axios = require("axios");
require("dotenv").config();

router.get("/", async (req, res) => {
 
  const pair = StellarSdk.Keypair.random();
  function createTestAccount() {
    try {
      axios(`https://friendbot.stellar.org?addr=${pair.publicKey()}`);
       
    } catch (e) {
      console.error("Oh no! Something went wrong:", e);
    }
  }
  createTestAccount();
  const publicKey = pair.publicKey();
  const secretKey = pair.secret();
  const result = { publicKey, secretKey };

  return res.json(result);
});

module.exports = router;


