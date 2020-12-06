import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post('/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
    if(req.body.orderItems.length === 0){
        res.status(400).send({message: 'Cart is empty'});
    }else{
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            user: req.user._id,
        });
        const createdOrder = await order.save();
        res.status(201).send({message: 'New Order Created', order: createdOrder});
    }
})
);

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) =>{
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message: 'Order Not Found'});
    }
}));

orderRouter.put('/:id/requested',isAuth,expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isRequested = true;
        const updatedOrder = await order.save();
        res.send({message: 'Requested', order: updatedOrder});
    }else{
        res.status(404).send({message: 'Request Not Found'});
    }
    
}));
export default orderRouter;