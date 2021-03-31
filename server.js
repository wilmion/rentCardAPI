const express = require('express');

const config = require('./config');

const app = express();

const router = require('./api/routes');

const cors = require('cors');

const errorMiddleware = require('./utils/middlewares/errorHandler');

const notFoundMidleware = require('./utils/middlewares/notFound');

app.use(express.json());
app.use(cors());
router(app);
app.use('*' , notFoundMidleware );
app.use(errorMiddleware);

app.listen(config.port , () => {
    console.log(`Listening of http://localhost:${config.port}`)
});