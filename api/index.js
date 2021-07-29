const server = require("./src/app");

// Here we put the main route and the secondary routes we have to create it in a new file and import its here.

module.exports = server.listen(3001, () => console.log('Listening at 3001'));
 
