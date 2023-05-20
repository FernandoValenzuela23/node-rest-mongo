const {response } = require('express');
const bcrypts = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/jwt-logic');

const login = async(req, res = response) => {
    const { email, password} = req.body;
    console.log(email, password)

    try {
        const usuario = await Usuario.findOne({email: email, status: true});
        if(!usuario) {
            return res.status(400).json({
                message: 'El usuario no existe o ha sido inactivado'
            });
        }
        
        // Hashing password
        const salt = bcrypts.genSaltSync();
        if(!bcrypts.compareSync(password, usuario.password)) {
            return res.status(400).json({
                message: 'Password incorrecto'
            });
        }

        // generar JWT
        const token = await generateJWT(usuario.id);

        res.json(
        {
            User: usuario,
            token: token
        }
    );
    } catch (error) {
        console.log(error);
        res.status(200).json({
            message: 'Error interno, comuniquese con el admin'
        });
    }    
}

module.exports = { login };