const router = require("express").Router();
const StellarSdk = require("stellar-sdk");
const axios = require("axios");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_PUBLIC_KEY
);

router.get("/", async (req, res) => {
 
  const pair = StellarSdk.Keypair.random();
 
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
      axios(`https://friendbot.stellar.org?addr=${pair.publicKey()}`);

      console.log(`Public Key: ${pair.publicKey()}`);
      console.log(`Secret Key: ${pair.secret()}`);
       
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


