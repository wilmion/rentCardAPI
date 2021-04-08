const DBLib = require('../../../lib/database');
const { encript } = require('../../../utils/encript');

const { jwtVerifyAuth , jwtVerifyUser } = require('../../../utils/middlewares/jwt')

class Controller {
    constructor(){
        this.dbAuth = new DBLib('auth');
        this.dbUser = new DBLib('user');
    }

    async register(body) {
        const authData = {
            email: body.email,
            password: await encript(body.password)
        }
        const existUser = await this.dbAuth.getByProp('email' , body.email);

        if(existUser){
            throw new Error('This user is exist')
        }

        await this.dbAuth.create(authData);
        
        const { password , ...data} = body;

        await this.dbUser.create(data);

        return 'Your register is completed';
    }
    async getAll(auth) {
        const token = auth.replace('Bearer ' , '')

        const isAdmin = await jwtVerifyAuth(token)

        if(isAdmin) {
            const data = await this.dbUser.getAll();
            return data;
        } 
        throw new Error('no es admin')
    }
    async getUser(id , auth) {
        const userAuth = await this.dbAuth.get(id);

        const token = auth.replace('Bearer ' , '')

        await jwtVerifyUser(token , userAuth);

        const user = await this.dbUser.getByProp('email' , userAuth.email);

        return user;
    }
    async patchUser(id , auth , body) {
        const userAuth = await this.dbAuth.get(id);

        const token = auth.replace('Bearer ' , '')

        await jwtVerifyUser(token , userAuth);

        const allUser = await this.dbUser.getAll();

        if(body.email !== userAuth.email) {
            const isEmailUsed = allUser.find(u => u.email === body.email);

            if(isEmailUsed) {
                throw new Error('email is exist')
            }
        }

        if(body.email || body.password) {
            const newAuth = {
                email: body.email? body.email : userAuth.email,
                password: body.password? await encript(body.password) : userAuth.password
            }

            await this.dbAuth.patch(id , newAuth);
        }

        const { password : not , ...data } = body;

        if(Object.keys(data).length === 0) {
            return 'User updated';
        }

        const user = await this.dbUser.getByProp('email' , userAuth.email);

        const { _id } = user;

        await this.dbUser.patch(_id , data);

        return 'User updated';
    }
    async deleteUser(id , auth) {
        const userAuth = await this.dbUser.get(id);

        const token = auth.replace('Bearer ' , '')

        await jwtVerifyAuth(token);

        const user = await this.dbAuth.getByProp('email' , userAuth.email);

        const { _id } = user;

        await this.dbAuth.delete(_id);
        await this.dbUser.delete(id);

        return 'Delete success user';
    }
}

module.exports = Controller