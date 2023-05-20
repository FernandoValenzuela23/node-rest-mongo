const { response } = require('express')
const bcrypts = require('bcryptjs')
const Usuario = require('../models/usuario');


const get = async(req, res = response) => {
    
    const { page = 0, pagesize = 5 } = req.query;
    const activeOnly = {status: true};
    
    /* Forma tradicional pero se suman los tiempos de consulta
    const total = await Usuario.countDocuments(activeOnly);
    const all = await Usuario.find(activeOnly).skip(page * pagesize).limit(pagesize);
    */


    // Forma correcta mediante promesas

    const [total, data] = await Promise.all([
        Usuario.countDocuments(activeOnly),
        Usuario.find(activeOnly).skip(page * pagesize).limit(pagesize)
    ]);


    res.status(200).json(
        {
            total,
            data
        });
};

const put = async(req, res = response) => {
    try {
        const id = req.params.id;
    
        const {_id, password, google, ...resto} = req.body;
    
        if(_id && id !== _id) {
            res.status(400).json({
                message: 'Envio un valor en campo id en el body, el mismo no corresponde al id parametrizado. Puede no enviarlo o si lo envia debe coincidir'
            });
            return;
        }
    
        
        if(password) {
            // Hashing password
            const salt = bcrypts.genSaltSync();
            resto.password = bcrypts.hashSync(password, salt);
        }
    
        // Buscar y actualizar al mismo tiempo
        await Usuario.findByIdAndUpdate(id, resto);

        const usuario = await Usuario.findById(id);
        
        res.json({
            usuario
        });
    } catch (error) {
        throw error;
    }
}

const post = async (req, res = response) => {      
    const {name, email, password, role} = req.body;
    const usuario = new Usuario({name, email, password, role});

    // Hashing password
    const salt = bcrypts.genSaltSync();
    usuario.password = bcrypts.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    });
}

const deleteUser = async(req, res = response) => {
    const id = req.params.id;

    //await Usuario.findByIdAndDelete(id);

    // Buscar y actualizar al mismo tiempo
    await Usuario.findByIdAndUpdate(id, {status: false});

    res.json({
        id
    });
}


module.exports = {
    get,
    put,
    post,
    deleteUser
};