const jwt = require('jsonwebtoken');
const { compare } = require('../encript');
const config = require('../../config/index');


async function jwtCreateToken(data){
    const token = await jwt.sign(data , config.jwt.secret);

    return token;
}

async function jwtVerifyAuth( token ) {

    const data = await jwt.verify(token , config.jwt.secret);

    const isAdmin = data.email === "wilmion92@gmail.com" && await compare(data.password , '123456789');

    if(!isAdmin) {
        throw new Error('Not permision')
    }

    return true;
}

async function jwtVerifyUser(token , user) {
    const data = await jwt.verify(token , config.jwt.secret);

    
    const isUser =  data.email === user.email && data.password == user.password;

    if(!isUser) {
        throw new Error('not is user');
    }
    return true;
}
module.exports = {
    jwtCreateToken,
    jwtVerifyAuth,
    jwtVerifyUser
};
