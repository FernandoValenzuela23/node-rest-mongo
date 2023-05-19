const Rol = require('../models/role')
const Usuario = require('../models/usuario')

const isRoleValid = async(name = '') => {
    const exists = await Rol.findOne({name});
    
    if(!exists){
        throw new Error('Rol no es valido')
    }

    return true;
}

const emailExists = async(email) => { 
    const exists = await Usuario.findOne({email});
    
    if(exists){
        throw new Error('Email ya registrado');
    }

    return true;
}

const existsUserId = async(id) => {
    const exists = await Usuario.findById(id);
    
    if(!exists){
        throw new Error('El usuario que desea actualizar no existe');
    }

    return true;

}

const isNumeric = async(text) => {
    if( isNaN(parseInt(text))) {
       throw new Error('Debe ser un numero'); 
    }
    return true;

}


module.exports = { isRoleValid, emailExists, existsUserId, isNumeric }