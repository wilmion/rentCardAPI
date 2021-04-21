const DBLib = require('../../../lib/database');
const { encryptObj , decryptObj } = require('../../../utils/encriptForPass');

const { jwtVerifyAuth } = require('../../../utils/middlewares/jwt')

class Controller {
    constructor() {
        this.db = new DBLib('payments')
    }
    async getAll() {
        const payments = await this.db.getAll();

        return payments;
    }
    async post(data , token) {

        await jwtVerifyAuth(token.replace('Bearer ' , ''));

        const dataEncrypt = await encryptObj(data);

        const postData = {
            data: dataEncrypt
        }

        const id = await this.db.create(postData);

        return `Payment create , ID=${id}`;
    }
    async patch(data , token , id){
        await jwtVerifyAuth(token.replace('Bearer ' , ''));

        const objData = await this.db.get(id);

        const dataEncrypt = objData.data;

        const updateObject = decryptObj(dataEncrypt);

        const NEWDATA = {
            ...updateObject,
            ...data
        }


        const updateData = {
            data: encryptObj(NEWDATA)
        }

        const _id = await this.db.patch(id , updateData)

        return 'Payment updated';
    }
    async delete(token , id) {
        await jwtVerifyAuth(token.replace('Bearer ' , ''));

        const deleteId = await this.db.delete(id);

        return 'Payment Method deleted from ID =' + deleteId;
    }
}

module.exports = Controller