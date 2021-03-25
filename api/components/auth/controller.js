const { jwtCreateToken } = require('../../../utils/middlewares/jwt')
const DBLib = require('../../../lib/database');

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

        const isCorrect = authData.email === userAuth.email && authData.password === userAuth.password;

        if(isCorrect){
            const token = await jwtCreateToken(authData);

            return {token , id: userAuth._id};
        }
        throw new Error('Not authentication user')
    }
}

module.exports = Controller