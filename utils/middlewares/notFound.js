const response = require('../response/index');

function errorHandler( req , res ) {
    response.error(req , res , 'Error 404 not found' , 404);
}

module.exports = errorHandler;