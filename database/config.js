const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            /*useCreateIndex: true,
            useFindAndModify: false*/
        });

        console.log('Conectado a la DB')

    } catch (error) {
        console.log(error)
        throw new Error('Error al intentar conectarse con la DB')
    }
}

module.exports = { dbConnection }