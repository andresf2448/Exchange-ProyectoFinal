const server = require("./src/App");

module.exports = server.listen(process.env.PORT, () => {
  console.log(`%s listening at twitter`); // eslint-disable-line no-console
});
