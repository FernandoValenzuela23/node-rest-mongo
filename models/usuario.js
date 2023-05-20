const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        required: [true],
        enum: ['ADMIN','USER']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

// debe ser una funcion normal porque usa el objeto this, 
// con esto se quita propiedades que crea mongo pero que no deseamos manipular 
UsuarioSchema.methods.toJSON = function() {
    const { _id, __v, password, ...usuario} = this.toObject(); // quitar version y password del objeto json
    return { uid: _id, ...usuario};
}

module.exports = model('Usuarios', UsuarioSchema);