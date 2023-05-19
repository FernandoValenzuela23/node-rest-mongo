require('dotenv').config();
const Server = require('./models/server.js');

const main = async() => {
    console.clear();
    const server = new Server();
    server.listen();
}

main();


