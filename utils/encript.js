const bcrypt = require('bcrypt');

async function encript(password) {
    const passEncript = await bcrypt.hash(password , 10);

    return passEncript;
}

async function compare(passEncript , password) {
    const result = await bcrypt.compare(password , passEncript);

    return result;
}



module.exports = {
    encript,
    compare
}