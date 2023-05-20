const { Router } = require('express');
const { 
    get,
    put,
    post,
    deleteUser } = require('../controllers/user.controller');
const { check } = require('express-validator');

const { 
    validateFields, 
    validateJWT, 
    isAdmin, 
    isAnyRol } = require('../middlewares') // aqui se uso index.js en la carpeta desde la cual se desea importar en una sola referencia

const { 
    isRoleValid, 
    emailExists, 
    existsUserId, 
    isNumeric 
} = require('../helpers/db-validators');

const router = Router();


router.get('',
[
    validateJWT, // middleware para validar el token
    check('page', 'Debe ser numerico').custom(p => p ? isNumeric(p) : true),
    check('pagesize', 'Debe ser numerico').custom(p => p ? isNumeric(p) : true),
    validateFields
], 
get);

router.put('/:id', 
[
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existsUserId),
    check('name', 'Nombre obligatorio').notEmpty(),
    check('email', 'Email no valido').isEmail(),
    check('password', 'Password debe tener al menos 6 caracteres').isLength({min: 6, max: 10}),
    check('role').custom(r => undefined ? true : isRoleValid),
    validateFields
],
put);

router.post('/', 
[
    check('name', 'Nombre obligatorio').notEmpty(),
    check('email', 'Email no valido').isEmail(),
    check('password', 'Password debe tener al menos 6 caracteres').isLength({min: 6, max: 10}),
    check('role').custom(isRoleValid),
    check('email').custom(emailExists),
    validateFields
], 
post);

router.delete('/:id', 
[
    validateJWT, // Middleware
    //isAdmin, // Middleware comentado porque solo es para admin
    isAnyRol('ADMIN','IT'), // Middleware especial con parametros
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existsUserId),
    validateFields
], 
deleteUser);


module.exports = router;