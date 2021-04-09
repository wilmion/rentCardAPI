const CryptoJS = require('crypto-js');
const config = require('../config/index');

function encryptObj( obj ) {
    const valueEncrypted = CryptoJS.AES.encrypt(JSON.stringify(obj) , config.cryptoSecret).toString();

    return valueEncrypted;
}
function decryptObj(code) {
    const dataString = CryptoJS.AES.decrypt(code , config.cryptoSecret).toString(CryptoJS.enc.Utf8);
    const obj = JSON.parse(dataString);

    return obj;
}

module.exports = {
    encryptObj,
    decryptObj
}