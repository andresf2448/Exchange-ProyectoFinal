const router = require("express").Router();
const StellarSdk = require("stellar-sdk");
const axios = require("axios");

router.post("/createWallet", async (req, res) => {
  
  const pair = StellarSdk.Keypair.random();
  try {
    const response = await axios(
      `https://friendbot.stellar.org?addr=${pair.publicKey()}`
    );

    console.log(`Public Key: ${pair.publicKey()}`);
    console.log(`Secret Key: ${pair.secret()}`);
    return res.send("cuenta creada exitosamente");
  } catch (e) {
    console.error("Oh no! Something went wrong:", e);
    throw new Error("ha ocurrido un error");
  }
});

module.exports = router;
