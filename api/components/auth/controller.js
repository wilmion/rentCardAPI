const { jwtCreateToken } = require('../../../utils/middlewares/jwt')
const DBLib = require('../../../lib/database');
const { compare } = require('../../../utils/encript');

class Controller {
    constructor(){
        this.dbAuth = new DBLib('auth');
        this.dbUser = new DBLib('user');
    }
    async login(body) {
        const authData = {
            email: body.email,
            password: body.password
        }
        const userAuth = await this.dbAuth.getByProp('email' , body.email);

        const isCorrect = authData.email === userAuth.email && await compare(userAuth.password , body.password);

        if(isCorrect){
            authData.password = userAuth.password;
            const token = await jwtCreateToken(authData);

            return {token , id: userAuth._id};
        }
        throw new Error('Not authentication user')
    }
}

module.exports = Controller