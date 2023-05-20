const {validationResult} = require('express-validator')

// Metodo generico que se utiliza en todos las apis para validar si hubo o no errores en los checks
const validateFields = (req, res, next) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

module.exports = { validateFields }