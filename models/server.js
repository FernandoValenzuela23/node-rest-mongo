const express = require('express');
const cors = require('cors')
const {dbConnection} = require('../database/config')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        // Mongo
        this.connectDb();

        // Middlewares
        this.middlewares();

        this.routes();        
    }

    routes() {
        
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/user'));

    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Lectura y parsing del body
        this.app.use(express.json());

        // Contenidos estaticos
        this.app.use(express.static('public'));


    }

    async connectDb() {
        await dbConnection();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Backend escuchando desde el puerto ${this.port}`);
        });
    }
}

module.exports = Server;