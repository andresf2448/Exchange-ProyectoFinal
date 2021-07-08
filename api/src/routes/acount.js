const router = require("express").Router();
const StellarSdk = require("stellar-sdk");
const axios = require("axios");
require("dotenv").config();
const bcrypt = require('bcrypt');

/* const { SECRET_KEY_ADMIN, PUBLIC_KEY_ADMIN } = process.env;
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org') */
   router.get("/createWallet", async (req, res) => {   
  
    const pair = StellarSdk.Keypair.random();
    const saltRounds = 10;
 /*    var opts = {
      destination: pair.publicKey(),
      startingBalance: "500",
      source: 'GAJ22WDPA3IOIJPOXBWPWAXU3MVVTHNXZJZ3DSGXZSK4LYKLKTJGJY33',
    };
    console.log(StellarSdk.Operation.createAccount(opts))
    console.log("cuenta creada exitosamente")
      
      return console.log(pair.publicKey());
    ;
  } catch (e) {

    console.error("Oh no! Something went wrong:", e);
    throw new Error("ha ocurrido un error");
  } */
   function createTestAccount() {
    try {
      console.log(
        "Funding a new account on the test network (takes a few seconds)…"
      );
       axios(
        `https://friendbot.stellar.org?addr=${pair.publicKey()}`  
      );
      
      console.log(`Public Key: ${pair.publicKey()}`);
      console.log(`Secret Key: ${pair.secret()}`);
      
    } catch (e) {
      console.error("Oh no! Something went wrong:", e);
    }  
  }
  createTestAccount();
  const publicKey = pair.publicKey()
  const result = [publicKey]   
  bcrypt.hash(pair.secret(), saltRounds).then((response) => {
      result.push(response)
     return console.log(result)
  })
  
   return res.json(result); 
   });  

module.exports = router;
