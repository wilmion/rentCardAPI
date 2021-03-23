const joi = require('@hapi/joi');

const nameSchema = joi.string().min(3);
const imageSchema = joi.string().uri();
const descriptionSchema = joi.string().min(20).max(400);
const markSchema = joi.string().min(4);
const priceSchema = joi.number().min(5);
const creationYearSchema = joi.number().min(2000).max(2070);
const ownerSchema = joi.string();
const bussinessNameSchema = joi.string().min(10);
const addressSchema = joi.string().min(10);
const stockSchema = joi.number();
const timeUsedSchema = joi.number();

//features

const doorsSchema = joi.number().min(2).max(7);
const capacitySchema = joi.number().min(2).max(10);
const typeTransmissionSchema = joi.string()
const typeCartSchema = joi.string()
const typeFuelSchema = joi.string()
const ccSchema = joi.number().min(900);
const yearSchema = joi.number().min(1990);


const createCartSchema = {
    name: nameSchema.required(),
    image: imageSchema.required(),
    description: descriptionSchema.required(),
    mark: markSchema.required(),
    price: priceSchema.required(),
    creationYear: creationYearSchema.required(),
    owner: ownerSchema.required(),
    bussinessName: bussinessNameSchema.required(),
    address: addressSchema.required(),
    stock: stockSchema.required(),
    features: {
        doors: doorsSchema.required(),
        capacity: capacitySchema.required(),
        typeTransmission: typeTransmissionSchema.required(),
        typeCart: typeCartSchema.required(),
        typeFuel: typeFuelSchema.required(),
        cc: ccSchema.required(),
        year: yearSchema.required()
    },
    timeUsed: timeUsedSchema.required()
}
const updateCartSchema = {
    name: nameSchema,
    image: imageSchema,
    description: descriptionSchema,
    mark: markSchema,
    price: priceSchema,
    creationYear: creationYearSchema,
    owner: ownerSchema,
    bussinessName: bussinessNameSchema,
    address: addressSchema,
    stock: stockSchema,
    features: {
        doors: doorsSchema,
        capacity: capacitySchema,
        typeTransmission: typeTransmissionSchema,
        typeCart: typeCartSchema,
        typeFuel: typeFuelSchema,
        cc: ccSchema,
        year: yearSchema
    },
    timeUsed: timeUsedSchema
}

module.exports = {
    updateCartSchema,
    createCartSchema
}