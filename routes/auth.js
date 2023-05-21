const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleLogin } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.post('/login',
[
    check('email', 'Email no valido').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validateFields
], 
login);

router.post('/google',
[
    check('id_token', 'Token de google es obligatorio').notEmpty(),
    validateFields
], 
googleLogin);

module.exports = router;