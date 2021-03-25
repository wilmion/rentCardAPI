const express = require('express');

const response = require('../../../utils/response/index');

const Controller = require('./controller');

const router = express.Router();

const controller = new Controller();

//schema

const { createUser , updateUser } = require('../../../utils/schema/user');
const idSchema = require('../../../utils/schema/id');

const validationHandler = require('../../../utils/middlewares/validationHandler')

router.post('/register' , validationHandler(createUser) , async (req , res , next) => {
    const { body } = req;
    try {
        const message = await controller.register(body);

        response.success(req , res , message , 201);
    }catch(e) {
        next({
            messageDev: e.message , 
            messageClient: 'Insuficient Data or Internal Server Error' , 
            status: 500
        })
    }
})
router.get('/'  , async (req , res , next) => {

    const { authorization } = req.headers;

    try {
        const data = await controller.getAll(authorization);

        response.success(req , res , data , 200)
    } catch(e) {
        next({
            messageDev: e.message , 
            messageClient: 'You can not do this' , 
            status: 500
        })
    }
})
router.get('/:id' ,validationHandler({id : idSchema } , 'params'), async (req , res , next) => {

    const { authorization } = req.headers;

    try {
        const data = await controller.getUser( req.params.id , authorization );

        response.success(req , res , data , 200)
    } catch(e) {
        next({
            messageDev: e.message , 
            messageClient: 'You can not do this' , 
            status: 500
        })
    }
});
router.patch('/:id' ,  validationHandler({id : idSchema } , 'params') , validationHandler(updateUser) , async (req , res , next) => {
    const { authorization } = req.headers;

    try {
        const id = await controller.patchUser( req.params.id , authorization , req.body );

        response.success(req , res , id , 200)
    } catch(e) {
        next({
            messageDev: e.message , 
            messageClient: 'You can not do this' , 
            status: 500
        });
    }
})
router.delete('/:id' , validationHandler({id : idSchema } , 'params') , async (req , res , next) => {
    const { authorization } = req.headers;

    try {
        const message = await controller.deleteUser( req.params.id , authorization);

        response.success(req , res , message , 200)
    } catch(e) {
        next({
            messageDev: e.message , 
            messageClient: 'You can not do this' , 
            status: 500
        });
    }
})

module.exports = router;
