const carts = require('./components/carts/network');
const auth = require('./components/auth/network');
const user = require('./components/user/network');

const router = (app) => {
    app.use('/api/carts' , carts);
    app.use('/api/auth' , auth);
    app.use('/api/users' , user);
}

module.exports = router;