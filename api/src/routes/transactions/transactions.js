const router = require("express").Router();
const supabase = require("../../supabase/supabase");

router.get("/", async (req, res) => {
  const { asset_code, no_older_than, limit, kind, paging_id } = req.query;
  let transactions = [];
  if(!asset_code) return res.status(404).json('Asset no provisto')

  /* if (asset_code && kind === 'deposit ') */
  try {
    console.log('entro a try transactions')
    const { data } = await supabase
    .from("transactions")
    .select(
      "id",
      "kind",
      "status",
      "status_eta",
      "kyc_verified",
      "more_info_url",
      "amount_in",
      "amount_out",
      "amount_fee",
      "started_at",
      "completed_at",
      "stellar_transaction_id",
      "external_transaction_id",
      "message",
      "refunded"
    )
    .eq("account_id", account_id);
    console.log('paso supabase transactions')
  if (data.length > 0/*  && kind === 'deposit ' */) {
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
      return transactions.push(response)
    });
    return res.json(transactions);
  }
  } catch (error) {
      return res.status(404).json(error)
  }
  
  
});

module.exports = router;
