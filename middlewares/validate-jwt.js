const jwt = require('jsonwebtoken')
const {response, request} = require('express');
const Usuario = require('../models/usuario');

const validateJWT = async(req = request, res = response, next) => {
    // usando los por defecto: 
    //const token = req.headers.authorization;

    // O un Key presonalizado en el header (NOTA: KEY EN MINUSCULAS)
    const token = req.headers['authorization-token'];

    if(!token) {
        return res.status(401).json({
            message: 'Es necesario un Token en esta peticion'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRET_JWT_KEY);

        // usuario con la peticion
        const userAuthenticated = await Usuario.findById(uid);
        if(!userAuthenticated) {
            return res.status(401).json({
                message: 'Peticion por usuario no registrado'
            });
        }
        
        // sobreescribir la request
        req.userAuthenticated = userAuthenticated;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token no valido'
        });
    }
    
}

module.exports = { validateJWT }