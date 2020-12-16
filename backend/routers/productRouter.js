import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import data from "../data.js";
import { isAuth } from '../utils.js';
const productRouter = express.Router();

productRouter.get('/' ,expressAsyncHandler(async(req, res) => {
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get('/seed',expressAsyncHandler(async(req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts});
}));


productRouter.get('/:id', expressAsyncHandler( async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message: 'Product not found'});
    }
}));

productRouter.post('/',isAuth, expressAsyncHandler(async(req,res) => {
    const product = new Product({
        name:'sample name',
        image:'/image/p1.jbg',
        address: '',
        catagory: 'sample catagory',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',
    });
    const createdProduct = await product.save();
    res.send({message: 'Product Created', product: createdProduct});
} ))
export default productRouter;