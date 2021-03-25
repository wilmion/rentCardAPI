const jwt = require('jsonwebtoken');
const config = require('../../config/index');


async function jwtCreateToken(data){
    const token = await jwt.sign(data , config.jwt.secret);

    return token;
}

async function jwtVerifyAuth( token ) {

    const data = await jwt.verify(token , config.jwt.secret);

    const isAdmin = data.email === "wilmion92@gmail.com";

    return isAdmin;
}

async function jwtVerifyUser(token , user) {
    const data = await jwt.verify(token , config.jwt.secret);

    const isUser =  data.email === user.email && data.password === user.password ;

    if(!isUser) {
        throw new Error('not is user');
    }
    return true;
}
module.exports = {
    jwtCreateToken,
    jwtVerifyAuth,
    jwtVerifyUser
}
