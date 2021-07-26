const router = require("express").Router();
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_PUBLIC_KEY
);

router.get("/", async (req, res) => {
  const { asset_code, no_older_than, limit, kind, paging_id, account_id } =
    req.query;

  if (!asset_code) return res.status(404).json("Asset no provisto");

  const { data } = await supabase
    .from("transactions")
    .select("*")
    .eq("account_id", account_id);

  if (data.length > 0) {
    const { data: withdraw } = await supabase.from("withdraw").select("*");

    const { data: deposit } = await supabase.from("deposit").select("*");

    const getTransactions = async () => {
     
      const transactions = data.map((transaction) => {
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

        if (transaction.kind === "deposit") {
          const aux = deposit.filter(
            (deposito) => deposito.id === transaction.id
          );
          const respuesta = {
            ...response,
            to: (aux[0].to || "pending"),
            from: (aux[0].from || "pending"),
            claimable_balance_id: (aux[0].claimable_balance_id || "pending"),
          };
          return respuesta;
        }
        if (transaction.kind === "withdraw") {
          const aux = withdraw.filter(
            (withdraw) => withdraw.id === transaction.id
          );
          const respuesta = {
            ...response,
            to: (aux[0].to || "pending"),
            from: (aux[0].from || "pending"),
            claimable_balance_id: (aux[0].claimable_balance_id || "pending"),
          };
          return respuesta;
        }
      });
      if(transactions.length === 0) return res.json('This account not have transactions record')
      return res.json(transactions);
    };
    getTransactions();
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

  let { data: asset } = await supabase
    .from("assets")
    .select("asset_code")
    .eq("asset_code", asset_code.toUpperCase());
    
  if (asset.length < 1)
    return res.json(
      "El asset no corresponde con uno valido del endpoint /info"
    );

  await supabase.from("transactions").insert([
    {
      asset_code: asset_code,
      account_id: account,
      kind: "deposit",
      status: "incompleted",
    },
  ]);
  
  let { data } = await supabase.from("transactions").select("*");
  

  if (amount && claimable_balance_supported) {
    
    const amount_out = amount - amount * 0.05;
    const amount_fee = amount * 0.05;
    async function updateTransaction() {
      await supabase
        .from("transactions")
        .update([
          {
            amount_in: amount,
            amount_out: amount_out,
            amount_fee: amount_fee,
            claimable_balance_supported: claimable_balance_supported,
          },
        ])
        .eq("id", data[data.length - 1].id);
    }
    await updateTransaction();
  }
  let idTransaction = data[data.length - 1].id
  
  const response = {
    type: "interactive_customer_info_needed",
    url: `/kycflow#${idTransaction}`,
    id: idTransaction,
  };
  
  return res.json( response );
});

router.post("/withdraw/interactive", async (req, res) => {
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

  let { data: asset } = await supabase
    .from("assets")
    .select("asset_code")
    .eq("asset_code", asset_code.toUpperCase());
  
  if (asset.length < 1)
    return res.json(
      "El asset no corresponde con uno valido del endpoint /info"
    );

  await supabase.from("transactions").insert([
    {
      asset_code: asset_code,
      account_id: account,
      kind: "withdraw",
      status: "incompleted",
    },
  ]);

  let { data, error } = await supabase.from("transactions").select("*");

  if (amount && claimable_balance_supported) {
    const amount_out = amount - amount * 0.05;
    const amount_fee = amount * 0.05;
    async function updateTransaction() {
      await supabase
        .from("transactions")
        .update([
          {
            amount_in: amount,
            amount_out: amount_out,
            amount_fee: amount_fee,
            claimable_balance_supported: claimable_balance_supported,
          },
        ])
        .eq("id", data[data.length - 1].id);
    }
    await updateTransaction();
  }

  const response = {
    type: "interactive_customer_info_needed",
    url: `https://localhost:3000/kycflow#${info.data[data.length - 1].id}`,
    id: info.data[data.length - 1].id,
  };
  return res.json({ response });
});

//

//conectamos stripe
//seteamos en la base de datos el status de la operacion
//cuando llega el aviso operacion de createClamaibleBalance
module.exports = router;
