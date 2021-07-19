const router = require("express").Router();
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_PUBLIC_KEY
);

router.get("/", async (req, res) => {
  console.log("entro a request");

  /* const { id, name, txid } = req.query.type; */
  const params = req.query.q;

  if (req.query.type === "name") {
    let user = params.split("*");

    const { data: response, error } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("email", user[0]);

    if (response[0]?.public_key)
      return res.json({
        stellar_address: user[0],
        account_id: response[0].public_key,
      });
  }

  if (req.query.type === "id") {
    c;
    let { data } = await supabase
      .from("datauser")
      .select("stellar_address")
      .eq("public_key", params);

    if (data[0]?.stellar_address) {
      return res.json({
        stellar_address: data[0].stellar_address,
        account_id: params,
      });
    }
  }

  if (req.query.type === "txid") {
    const { data: hash } = await supabase
      .from("transactions")
      .select("id_user")
      .eq("id", params);

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
    .status(404)
    .json({ error: "No se ha encontrado un usuario valido" });
});

module.exports = router;
