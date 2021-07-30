const router = require("express").Router();
const multer = require("multer");
const ocrad = require("async-ocrad");

const upload = multer();

router.post("/", upload.single("file"), async (req, res, next) => {
  const { file } = req;
  const { identificacion } = req.body;

  var text = await ocrad(file.path);
  text = text.replace(/ /g, "");
  text = text.replace(/\./g, "");

  var number = text.includes(identificacion);

  if(number === true){
     return res.send(true);
  }
  
  return res.send(false);
});

module.exports = router;
