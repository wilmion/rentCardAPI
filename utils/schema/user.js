const joi = require('@hapi/joi');

const usernameSchema = joi.string().min(4);
const nameSchema = joi.string().min(10)
const emailSchema = joi.string().email();
const passwordSchema = joi.string().min(8);
const cartSchema = joi.array();
const rentedCartsSchema = joi.array();
const rentalCartsSchema = joi.array()

const createUser = {
    username: usernameSchema.required(),
    fullName: nameSchema.required(), 
    email: emailSchema.required(),
    password: passwordSchema.required(),
    cart: cartSchema.required(),
    rentedCarts: rentedCartsSchema.required(),
    rentalCarts: rentalCartsSchema.required()
}

const updateUser = {
    username: usernameSchema,
    fullName: nameSchema, 
    email: emailSchema,
    password: passwordSchema,
    cart: cartSchema,
    rentedCarts: rentedCartsSchema,
    rentalCarts: rentalCartsSchema
}

module.exports = {
    createUser,
    updateUser
}