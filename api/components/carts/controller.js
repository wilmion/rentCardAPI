const response = require('../../../utils/response/index');
const dummy = require('../../../utils/dummy/dummy');

const DB = require('../../../lib/database');

const cartsDatabase = new DB('carts') 

class controllerCarts {
    constructor () {
        this.collection = 'carts';
    }

    getAll(query) {
        const { limit , mark , mincc , type } = query;
        let carts = cartsDatabase.getAll(Number(limit));

        if(mark) {
            carts = carts.map(c => c.mark === mark);
        }
        if(mincc) {
            carts = carts.map(c => c.features.cc >= mincc );
        }
        if(type) {
            carts = carts.map(c => c.features.typeCart === type);
        }
        return carts;
    }
    get(id) {
        const cart = cartsDatabase.get(id);
        return cart;
    }
    create(data){
        const newCartId = cartsDatabase.create(data);
        return newCartId;
    }
    update(id , data) {
        const updatedCart = cartsDatabase.patch(id , data);
        return updatedCart;
    }
    delete(id) {
        const deletedCart = cartsDatabase.delete(id);

        return deletedCart;
    }
}

module.exports = controllerCarts;