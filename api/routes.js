const carts = require('./components/carts/network');
const auth = require('./components/auth/network');
const user = require('./components/user/network');
const payments = require('./components/payments/network');

const router = (app) => {
    app.use('/api/carts' , carts);
    app.use('/api/auth' , auth);
    app.use('/api/users' , user);
    app.use('/api/payments' , payments);
}

module.exports = router;