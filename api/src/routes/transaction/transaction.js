const router = require("express").Router();


router.get("/", async (req, res) => {
  const { id, stellar_transaction_id, external_transaction_id } = req.query;

  if (!id && !stellar_transaction_id && !external_transaction_id)
    return res.json("parameters not provided");

    if (id) {
      try {
        console.log('entro al id transaction')
        const { data, error } = await supabase
          .from("transactions")
          .select(
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
          .eq("id", id);
          console.log('paso supabase')
        console.log(data)
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
        console.log(response)
        return res.json(response);
      } catch (error) {
        return res.json('transaction no encontrada');
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
