const router = require("express").Router();
const StellarSdk = require("stellar-sdk");
const supabase = require("supabase");

router.get("/", async (req, res) => {
  const { id } = req.query.type;
  const { name } = req.query.type;
  const { txid } = req.query.type;
  const { forward } = req.query.type;
  const data = req.query.q;

  if (name) {
    let user = data.split("*");

    const { data: email, error } = await supabase
      .from("datauser")
      .select("email")
      .eq("email", user[0]);

    if (email[0]?.email) {
      const { data, error } = await supabase
        .from("datauser")
        .select("public_key")
        .eq("email", user[0]);

      if (data[0]?.public_key)
        return res.json({
          stellar_address: user,
          account_id: data[0].public_key,
        });
    }
  }

  if (id) {
    const { data } = await supabase
      .from("datauser")
      .select("stellar_address")
      .eq("public_key", id);

    if (data[0]?.stellar_address) {
      return res.json({
        stellar_address: data[0].stellar_address,
        account_id: id,
      });
    }
  }

  if (txid) {
    const { data: hash } = await supabase
      .from("transactionId")
      .select("*")
      .eq("id", id);

    if (hash[0]?.id) {
      const { data: response } = await supabase
        .from("datauser")
        .select("stellar_address", "public_key")
        .eq("id", id);

      return res.json({
        stellar_address: response[0]?.stellar_address,
        account_id: response[0]?.public_key,
      });
    }
  }

  return res
    .statusCode(404)
    .json({ error: "No se ha encontrado un usuario valido" });
});

module.exports = router;
