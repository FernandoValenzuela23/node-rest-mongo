const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.post('/login',
[
    check('email', 'Email no valido').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validateFields
], 
login);

module.exports = router;