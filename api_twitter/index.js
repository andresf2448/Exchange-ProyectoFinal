const server = require("./App");

server.listen(process.env.PORT, () => {
  console.log(`%s listening at ${process.env.PORT} twitter`); // eslint-disable-line no-console
});
