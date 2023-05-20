const validatorFields = require('../middlewares/validate-fields')
const validatorJWT = require('../middlewares/validate-jwt');
const validatorRole= require('../middlewares/validate-role-authenticated');

module.exports = {
    ...validatorFields,
    ...validatorJWT,
    ...validatorRole,
}