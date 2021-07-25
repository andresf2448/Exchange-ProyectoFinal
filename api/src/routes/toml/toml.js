const router = require("express").Router();
const toml = require("toml");
const fs = require("fs");
const path = require('path')


router.get("/", (req, res, next) => {
  /* const config = toml.parse(fs.readFileSync('./src/routes/toml/stellar.toml','utf-8')); */
  var options = {
    root: path.join(__dirname),
  };

  res.set("Content-Type", "text/plain");
  res.sendFile("stellar.toml", options, function (err) {
    if (err) {
      next(err);
    } 
  });
  /* res.send(config); */
});

module.exports = router;
