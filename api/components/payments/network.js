const express = require('express');

const response = require('../../../utils/response/index');

const Controller = require('./controller');

const router = express.Router();

const controller = new Controller();

//schemas

const { createPayment , updatePayment } = require('../../../utils/schema/payment');
const idSchema = require('../../../utils/schema/id');

const validationHandler = require('../../../utils/middlewares/validationHandler')

router.get('/' , async (req , res , next) => {
    const token = req.headers.authorization;

    try {
        const data = await controller.getAll(token);

        response.success( req , res , data , 200 );

    } catch (error) {
        next({
            messageDev: error.message , 
            messageClient: 'You can not do this' , 
            status: 500
        })
    }
})
router.post('/' , validationHandler(createPayment) , async (req , res , next) => {
    const token = req.headers.authorization;
    const { body } = req;

    try {
        const data = await controller.post( body , token);

        response.success( req , res , data , 201 );

    } catch (error) {
        next({
            messageDev: error.message , 
            messageClient: 'You can not do this' , 
            status: 500
        })
    }
})
router.patch('/:id' ,
 validationHandler({id:idSchema} , 'params') , 
 validationHandler(updatePayment) , 
 async (req , res , next) => {
    const token = req.headers.authorization;
    const { params , body } = req;

    try {
        const data = await controller.patch( body , token , params.id);

        response.success( req , res , data , 200 );

    } catch (error) {
        next({
            messageDev: error.message , 
            messageClient: 'You can not do this' , 
            status: 500
        })
    }
})
router.delete('/:id' , validationHandler({id:idSchema} , 'params') , async (req,res,next) => {
    const token = req.headers.authorization;
    const { id } = req.params

    try {
        const message = await controller.delete( token , id );

        response.success(req, res , message , 200);
    } catch (error) {
        next({
            messageDev: error.message , 
            messageClient: 'You can not do this' , 
            status: 500
        })
    }
})

module.exports = router;