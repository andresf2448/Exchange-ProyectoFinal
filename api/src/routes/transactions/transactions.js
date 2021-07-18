const router = require("express").Router();
const supabase = require("../../supabase/supabase");

router.get("/", async (req, res) => {
  const { asset_code, no_older_than, limit, kind, paging_id } = req.query;
  let transactions = [];

  
});

module.exports = router;
