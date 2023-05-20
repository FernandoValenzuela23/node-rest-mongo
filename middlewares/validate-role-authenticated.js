const { response } = require("express");


const isAdmin = (req, res = response, next) => {

    if( !req.userAuthenticated ) {
        return res.status(500).json({
            message: 'Validando Rol sin usuario autenticado'
        });
    }

    if( req.userAuthenticated.role !== 'ADMIN' ) {
        return res.status(401).json({
            message: 'El usuario logueado no es ADMIN'
        });
    }

    next();
}

// funcion especial para aceptar vrios argumentos y luego manejar los req y res de un middleware comun
const isAnyRol = (...roles) => {
    return (req, res = response, next) => {
        if( !req.userAuthenticated ) {
            return res.status(500).json({
                message: 'Validando Rol sin usuario autenticado'
            });
        }
    

        if(!roles.some(p => p === req.userAuthenticated.role)) {
            return res.status(401).json({
                message: 'El rol del usuario logueado no corresponde a alguno de los solicitados'
            });   
        }

        next();
    }
}

module.exports = { isAdmin, isAnyRol }