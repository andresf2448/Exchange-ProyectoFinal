const router = require("express").Router();
const supabase = require("../../supabase/supabase");
 

router.get("/", async (req, res) => {
  const { id, name, txid } = req.query.type;
  const data = req.query.q;

  if (name) {
    let user = data.split("*");

    const { data: response, error } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("email", user[0]);

    if (response[0]?.public_key)
      return res.json({
        stellar_address: user,
        account_id: response[0].public_key,
      });
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
      .select("id_user")
      .eq("id", txid);

    if (hash[0]?.id_user) {
      const { data: response } = await supabase
        .from("datauser")
        .select("stellar_address", "public_key")
        .eq("id_user", hash[0].id_user);

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
