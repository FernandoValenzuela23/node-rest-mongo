const {response } = require('express');
const bcrypts = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/jwt-logic');
const { googleVerify } = require('../helpers/google-verify');
const usuario = require('../models/usuario');

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

const googleLogin = async(req, res = response) => {
    // https://developers.google.com/identity/gsi/web/guides/verify-google-id-token?hl=es-419
    const { id_token } = req.body;
    
    try {
        const {name,picture,email} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({email});

        if(!usuario || usuario === null) {
            usuario = new Usuario({name, email, password: 'google',role: 'USER', google: true});       
            await usuario.save(); 
            console.log('Creado: ',usuario)    
        }

        console.log(usuario)

        if(!usuario.status) {
            res.status(401).json({
                User: undefined,
                message: 'Usuario inactivado'
            });
        }

        // generar el token de nuestra app
        const token = await generateJWT(usuario.id);
        
        console.log('BE: JWT Token: ', token)

        res.json({
            User: usuario,
            token: token
        });
        
    } catch (error) {
        console.log('BE: ', error)
        res.status(400).json({
            User: undefined,
            message: 'No se pudo verificar el token'
        });
    }

    
}

module.exports = { login, googleLogin };