const carts = require('./components/carts/network');

const router = (app) => {
    app.use('/api/carts' , carts);
}

module.exports = router;