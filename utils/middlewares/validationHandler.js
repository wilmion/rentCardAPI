const joi = require('@hapi/joi');

function validate(data , schema) {
    const { error } = joi.object(schema).validate(data);

    return error
}

function validationHandler(schema , check="body") {
    return (req , res , next) => {
        const error = validate(req[check] , schema);

        error? next({
            messageDev: 'Verify to request' , 
            messageClient: error.details[0].message , 
            status: 501
        }): next();
    }
}
module.exports = validationHandler;