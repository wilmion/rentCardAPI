const response = require('../../../utils/response/index');
const dummy = require('../../../utils/dummy/dummy');

const DB = require('../../../lib/database');

const cartsDatabase = new DB('carts') 

class controllerCarts {
    constructor () {
        this.collection = 'carts';
    }
    async getAll(query) {
        const { limit , mark , mincc , type } = query;
        let carts = await cartsDatabase.getAll(Number(limit));

        if(mark) {
            carts = await carts.map(c => c.mark === mark);
        }
        if(mincc) {
            carts = await carts.map(c => c.features.cc >= mincc );
        }
        if(type) {
            carts = await carts.map(c => c.features.typeCart === type);
        }
        return carts;
    }
    async get(id) {
        const cart = await cartsDatabase.get(id);
        if(cart === null) {
            throw new Error('Not found item');
        }
        return cart;
    }
    async create(data , auth){
        const newCartId = await cartsDatabase.create(data);
        return newCartId;
    }
    async update(id , data , auth ) {
        const updatedCart = await cartsDatabase.patch(id , data);
        return updatedCart;
    }
    async delete(id , auth) {
        const deletedCart = await cartsDatabase.delete(id);

        return deletedCart;
    }
}

module.exports = controllerCarts;