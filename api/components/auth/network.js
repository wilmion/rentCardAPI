const express = require('express');

const response = require('../../../utils/response/index');

const Controller = require('./controller');

const router = express.Router();

const controller = new Controller();

//schema

const { authSchema } = require('../../../utils/schema/auth');

const validationHandler = require('../../../utils/middlewares/validationHandler')

router.post('/' ,validationHandler(authSchema) , async (req , res , next) => {
    try {
        const token = await controller.login(req.body)
        response.success(req, res , token , 200 )
    }catch(e) {
        next({
            messageDev: e.message , 
            messageClient: e.message , 
            status: 500
        })
    }
    
})
module.exports = router;