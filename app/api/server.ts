import bodyParser = require('body-parser');
import express = require('express');

const app:express.Application = express();

//routes

app.use(bodyParser.json())

app.get('/' , (req , res) => {
    res.json({
        message: "Bienvenido al primer commit del inicio de este proyecto , faltaria la arquitectura de este API",
        psdta: "bueno si te sumergiste hasta este punto , si eres ana , pues , te quiero muxo <3 <3 "
    })
})

//listening

app.listen(3000 , () => {
    console.info(`Listening of http://localhost:${3000}`)
})
