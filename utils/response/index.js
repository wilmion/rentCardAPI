function success(req , res , data , status) {
    const structure = {
        error: null,
        data: data,
    }
    res.status(status).send(structure);
}
function error(req , res , err , status) {
    const structure = {
        error: err,
        data: null,
    }
    res.status(status).send(structure);
}

module.exports = {
    success,
    error
}