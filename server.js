const express = require('express');

const config = require('./config');

const app = express();

const router = require('./api/routes');

const errorMiddleware = require('./utils/middlewares/errorHandler');

const notFoundMidleware = require('./utils/middlewares/notFound');

app.use(express.json());
router(app);
app.use('*' , notFoundMidleware );
app.use(errorMiddleware);

app.listen(config.port , () => {
    console.log(`Listening of http://localhost:${config.port}`)
});