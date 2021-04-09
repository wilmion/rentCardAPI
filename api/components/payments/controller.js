const DBLib = require('../../../lib/database');
const { encryptObj , decryptObj } = require('../../../utils/encriptForPass');

const { jwtVerifyAuth } = require('../../../utils/middlewares/jwt')

class Controller {
    constructor() {
        this.db = new DBLib('payments')
    }
    async getAll(token) {
        const payments = await this.db.getAll();

        await jwtVerifyAuth(token.replace('Bearer ' , ''));

        let paymentsArrObj = new Array();

        payments.forEach(p => {
            paymentsArrObj.push({
                "_id" : p._id,
                data : decryptObj(p.data)
            })
        })

        return paymentsArrObj;
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