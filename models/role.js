const { Schema, model } = require('mongoose');

const RolSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }
});

module.exports = model('Rol', RolSchema);