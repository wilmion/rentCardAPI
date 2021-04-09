const joi = require('@hapi/joi');

const methodSchema = joi.string().min(5).max(15);
const dataSchema = joi.object();
const imageSchema = joi.string().uri();

const createPayment = {
    method : methodSchema.required() ,
    data : dataSchema.required() ,
    image: imageSchema.required()
}

const updatePayment = {
    method : methodSchema ,
    data : dataSchema ,
    image: imageSchema
}

module.exports = {
    createPayment,
    updatePayment
}