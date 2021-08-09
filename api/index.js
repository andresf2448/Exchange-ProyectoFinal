const server = require("./src/app");


// Here we put the main route and the secondary routes we have to create it in a new file and import its here.

module.exports = server.listen(process.env.PORT, () => {
    
  console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console
});
