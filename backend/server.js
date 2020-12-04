import express from "express";
import mongoose from 'mongoose';
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import dotenv from 'dotenv';
import cors from 'cors';
import orderRouter from "./routers/orderRouter.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
// const dbusername = nalin;
// const dbpassword = nalin123;
// const db = mongo "mongodb+srv://cluster0.cjemo.mongodb.net/<dbname>" --username nalin;

mongoose.connect('mongodb+srv://nalin:nalin123@cluster0.ergvr.mongodb.net/sahayata?retryWrites=true&w=majority',
    {useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,});
// mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/sahayata',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
// });

app.use('/api/users', userRouter);

app.use('/api/products',productRouter);

app.use('/api/requests',orderRouter);

app.get('/', (req,res)=>{
    res.send('Server is ready');
});

app.use((err,req,res,next) => {
    res.status(500).send({message: err.message});
});

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('../build'));
// }

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Serve at http://localhost:${port}`);
});
