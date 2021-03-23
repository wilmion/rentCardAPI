const express = require('express');

const response = require('../../../utils/response/index');

const Controller = require('./controller');

const router = express.Router();

const controller = new Controller();

//schema

const validationHandler = require('../../../utils/middlewares/validationHandler');

const idSchema = require('../../../utils/schema/id')
const { createCartSchema , updateCartSchema } = require('../../../utils/schema/carts')

router.get('/' , async (req , res , next) => {
    const query = req.query;
    console.log(query);
    try {
        const carts = await controller.getAll(query);

        response.success(req , res , carts , 200);
    }catch(e) {
        next({
            messageDev: e.message , 
            messageClient: 'Internal server error' , 
            status: 500
        });
    }
    
})
router.get('/:id' , validationHandler({id: idSchema} , 'params') , async (req , res , next) => {
    const { id } = req.params;

    try {
        const cart = await controller.get(id);

        response.success(req , res , cart , 200);
    }catch(e) {
        next({
            messageDev: e.message , 
            messageClient: 'Invalid ID or Internal server error' , 
            status: 500
        });
    } 
})
router.post('/' , validationHandler(createCartSchema) , async (req , res , next) => {
    try {
        const createdCart = await controller.create(req.body)
        response.success(req , res , createdCart , 201);
    } catch(e){
        next({
            messageDev: e.message , 
            messageClient: 'Insuficient Data' , 
            status: 501
        });
    }
})
router.patch(
    '/:id' , 
    validationHandler({id: idSchema} , 'params') ,
    validationHandler(updateCartSchema) , 
    async (req , res) => {

        const { id } = req.params;

        try {

            const updatedCart = await controller.update(id , req.body);

            response.success(req , res , updatedCart , 200);
        } catch(e) {
            next({
                messageDev: e.message , 
                messageClient: 'Invalid ID , Not Body or Internal Server Error' , 
                status: 501
            });
        }
})
router.delete('/:id' , async (req , res , next) => {

    const { id } = req.params;

    try {
        const deletedCart = await controller.delete(id);

        response.success(req , res , deletedCart , 202);
    } catch(e) {
        next({
            messageDev: e.message , 
            messageClient: 'Invalid ID or Internal Server Error' , 
            status: 500
        });
    }
})

module.exports = router;