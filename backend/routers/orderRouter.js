import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();
orderRouter.get('/mine',isAuth,expressAsyncHandler(async (req,res) => {
    const order =await  Order.find({user: req.user._id});
    res.send(order);
}))
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

orderRouter.get('/',isAuth,expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name');
    res.send(orders);
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

orderRouter.delete('/:id',isAuth,expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        const deleteOrder = await order.remove();
        res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
    })
);
orderRouter.put('/:id/deliver',isAuth,expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
    })
);


export default orderRouter;