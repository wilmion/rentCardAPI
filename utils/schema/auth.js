const joi = require('@hapi/joi');

const emailSchema = joi.string().email();
const passwordSchema = joi.string().min(8);

const authSchema = {
    email: emailSchema.required(),
    password: passwordSchema.required()
}

module.exports = {
    authSchema
}