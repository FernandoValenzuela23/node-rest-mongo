const { Router } = require('express');
const { 
    get,
    put,
    post,
    deleteUser } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { validateUserFields } = require('../middlewares/validate-fields')
const { 
    isRoleValid, 
    emailExists, 
    existsUserId, 
    isNumeric 
} = require('../helpers/db-validators');

const router = Router();


router.get('',
[
    check('page', 'Debe ser numerico').custom(p => p ? isNumeric(p) : true),
    check('pagesize', 'Debe ser numerico').custom(p => p ? isNumeric(p) : true),
    validateUserFields
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
    validateUserFields
],
put);

router.post('/', 
[
    check('name', 'Nombre obligatorio').notEmpty(),
    check('email', 'Email no valido').isEmail(),
    check('password', 'Password debe tener al menos 6 caracteres').isLength({min: 6, max: 10}),
    check('role').custom(isRoleValid),
    check('email').custom(emailExists),
    validateUserFields
], 
post);

router.delete('/:id', 
[
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existsUserId),
    validateUserFields
], 
deleteUser);


module.exports = router;