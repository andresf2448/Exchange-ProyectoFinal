const router = require("express").Router();
const StellarSdk = require("stellar-sdk");
const axios = require("axios");
require("dotenv").config();

router.get("/", (req, res) => {
 
  
  const pair = StellarSdk.Keypair.random();
  async function createTestAccount() {
    try {
      await axios(`https://friendbot.stellar.org?addr=${pair.publicKey()}`);
      
      const publicKey = pair.publicKey();
      const secretKey = pair.secret();
      const result = { publicKey, secretKey };
    
      return res.json(result);
       
    } catch (e) {
      console.error("Oh no! Something went wrong:", e);
    }
  }
  createTestAccount();
});

module.exports = router;


