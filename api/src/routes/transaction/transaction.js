const router = require("express").Router();
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  "https://tmgftkiwxvealggjbuuw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNTU1Mzc5NSwiZXhwIjoxOTQxMTI5Nzk1fQ.ABvEpuBbGTkr4y1UHyrjRbkUugTbhUNGPhbqAMy3cVs"
);

router.get("/", async (req, res) => {
  const { id, stellar_transaction_id, external_transaction_id } = req.query;

  if (!id && !stellar_transaction_id && !external_transaction_id)
    return res.json("parameters not provided");

  if (id) {
    try {
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .eq("id", id);

      if (data.length === 0) return res.json("no existe esta transaccion");

      const { data: withdraw } = await supabase.from("withdraw").select("*").eq('id', id);

      const { data: deposit } = await supabase.from("deposit").select("*").eq('id', id);

      let response = {
        id: id,
        kind: data[0].kind,
        status: data[0].status,
        status_eta: data[0].status_eta,
        external_transaction_id: data[0].external_transaction_id,
        more_info_url: data[0].more_info_url,
        amount_in: data[0].amount_in,
        amount_fee: data[0].amount_fee,
      };
      if (data[0].kind === "deposit") {
        const aux = deposit.filter(
          (deposito) => deposito.id === transaction.id
        );
        const respuesta = {
          ...response,
          to: aux[0].to ? aux[0].to : "pending",
          from: aux[0].from ? aux[0].from : "pending",
          claimable_balance_id: aux[0].claimable_balance_id
            ? aux[0].claimable_balance_id
            : "pending",
        };
        return res.json(respuesta);
      }
      if (data[0].kind === "withdraw") {
        const aux = withdraw.filter((withdraw) => withdraw.id === data[0].id);
        const respuesta = {
          ...response,
          to: aux[0].to ? aux[0].to : "pending",
          from: aux[0].from ? aux[0].from : "pending",
          claimable_balance_id: aux[0].claimable_balance_id
            ? aux[0].claimable_balance_id
            : "pending",
        };
        return res.json(respuesta);
      }
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  if (stellar_transaction_id) {
    try {
      const { data } = await supabase
        .from("transactions")
        .select(
          "id",
          "kind",
          "status",
          "status_eta",
          "external_transaction_id",
          "more_info_url",
          "amount_in",
          "amount_out",
          "amount_fee",
          "started_at",
          "claimable_balance_id"
        )
        .eq("stellar_transaction_id", stellar_transaction_id);

      let response = {
        id: data[0].id,
        kind: data[0].kind,
        status: data[0].status,
        status_eta: data[0].status_eta,
        external_transaction_id: data[0].external_transaction_id,
        more_info_url: data[0].more_info_url,
        amount_in: data[0].amount_in,
        amount_fee: data[0].amount_fee,
      };
      return res.json(response);
    } catch (error) {
      return res.json(error);
    }
  }

  if (external_transaction_id) {
    try {
      const { data } = await supabase
        .from("transactions")
        .select(
          "id",
          "kind",
          "status",
          "status_eta",
          "more_info_url",
          "amount_in",
          "amount_out",
          "amount_fee",
          "started_at",
          "claimable_balance_id"
        )
        .eq("external_transaction_id", external_transaction_id);

      let response = {
        id: data[0].id,
        kind: data[0].kind,
        status: data[0].status,
        status_eta: data[0].status_eta,
        external_transaction_id: external_transaction_id,
        more_info_url: data[0].more_info_url,
        amount_in: data[0].amount_in,
        amount_fee: data[0].amount_fee,
      };
      return res.json(response);
    } catch (error) {
      return res.json(error);
    }
  }
});

module.exports = router;
