const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index");
const server = express();

server.use(morgan("dev"));
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();

});



server.use('/authentication', routes.authentication)
server.use("/federation", routes.federation);
server.use("/info", routes.info);
server.use("/transactions", routes.transactions);
server.use("/transaction", routes.transaction);
server.use("/payment", routes.payment);
server.use("/createWallet", routes.acount);
server.use("/create-payment-intent", routes.stripe);
server.use("/.well-known/stellar.toml", routes.toml);
server.use("/emails", routes.emails);
server.use("/whatsapp", routes.whatsapp);
server.use("/invite", routes.invite);
/* server.use("/upload", routes.upload); */

server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;