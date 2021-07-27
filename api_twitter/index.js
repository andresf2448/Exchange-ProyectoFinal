const server = require("./src/App");

module.exports = server.listen(process.env.PORT, () => {
  console.log(`%s listening at ${process.env.PORT} twitter`); // eslint-disable-line no-console
});
