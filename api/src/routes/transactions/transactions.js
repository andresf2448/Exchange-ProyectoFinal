const router = require("express").Router();
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_PUBLIC_KEY
);

router.get("/", async (req, res) => {
  //añadir account_id como parametro via jwt
  const { asset_code, no_older_than, limit, kind, paging_id, account_id } =
    req.query;
  let transactions = [];
  if (!asset_code) return res.status(404).json("Asset no provisto");

  /* if (asset_code && kind === 'deposit ') */
  try {
    console.log("entro a try transactions");
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("account_id", account_id);
    console.log("paso supabase transactions");
    console.log(data);
    if (data.length > 0 /*  && kind === 'deposit ' */) {
      data.map((transaction) => {
        let response = {
          id: transaction.id,
          kind: transaction.kind,
          status: transaction.status,
          status_eta: transaction.status_eta,
          kyc_verified: transaction.kyc_verified,
          more_info_url: transaction.more_info_url,
          amount_in: transaction.amount_in,
          amount_out: transaction.amount_out,
          amount_fee: transaction.amount_fee,
          started_at: transaction.started_at,
          completed_at: transaction.completed_at,
          stellar_transaction_id: transaction.stellar_transaction_id,
          external_transaction_id: transaction.external_transaction_id,
          message: transaction.message,
          refunded: transaction.refunded,
        };
        return transactions.push(response);
      });
      return res.json(transactions);
    }
  } catch (error) {
    return res.status(404).json(error);
  }
});

router.post("/deposit/interactive", async (req, res) => {
  const {
    asset_code,
    account,
    asset_issuer,
    amount,
    memo_type,
    memo,
    wallet_name,
    wallet_url,
    claimable_balance_supported,
  } = req.body;
  // jwt 
//validamos el asset q corresponda con uno valido de la base de datos q manejeamos nosotros



//conectamos stripe
//seteamos en la base de datos el status de la operacion 
//cuando llega el aviso operacion de createClamaibleBalance
//return 


});

//

module.exports = router;
