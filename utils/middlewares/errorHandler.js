const response = require('../response/index');

function errorHandler(err , req , res , next) {
    const { messageDev , messageClient , status } = err;

    console.error(messageDev)

    response.error(req , res , messageClient , status);
}

module.exports = errorHandler;