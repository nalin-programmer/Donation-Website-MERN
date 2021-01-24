import express from "express";
import mongoose from 'mongoose';
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from './routers/UploadRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
// Write mogoDB database connection url in place of DATABASE_NAME
mongoose.connect(DATABASE_URL,
    {useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,});


app.use('/api/uploads', uploadRouter);

app.use('/api/users', userRouter);

app.use('/api/products',productRouter);

app.use('/api/requests',orderRouter);

app.get('/', (req,res)=>{
    res.send('Server is ready');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use((err,req,res,next) => {
    res.status(500).send({message: err.message});
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Serve at http://localhost:${port}`);
});
