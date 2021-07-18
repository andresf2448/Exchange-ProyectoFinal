const router = require("express").Router();

router.get("/", async (req, res) => {
  const result = {
    deposit: {
      USD: {
        enabled: true,
        fee_fixed: 5,
        fee_percent: 1,
        min_amount: 0.1,
        max_amount: 1000,
      },
      ETH: {
        enabled: true,
        fee_fixed: 0.002,
        fee_percent: 0,
      },
    },
    withdraw: {
      USD: {
        enabled: true,
        fee_minimum: 5,
        fee_percent: 0.5,
        min_amount: 0.1,
        max_amount: 1000,
      },
      ETH: {
        enabled: false,
      },
    },
    fee: {
      enabled: false,
    },
  };

  return res.json(result);
});

module.exports = router;
