const express=require('express');
const userRouter=require('./routes/userRoutes');
const requestlogger=require('./utils/logger');
const unknownendpoint=require('./utils/Error');
const cors=require('cors');
const cookieparser=require('cookie-parser');
const productRouter=require('./routes/productRoutes');
const orderRouter=require('./routes/orderRoutes');
const cartRouter=require('./routes/cartRoutes');

const app=express();

app.use(cors({
    origin:'https://system01.netlify.app/http://localhost:5173',
    credentials:true
}));

app.use(cookieparser());

app.use(express.json());

app.use(requestlogger);

app.use('/api/v1/users',userRouter);

app.use('/api/v1/products',productRouter);

app.use('api/v1/orders',orderRouter);

app.use('api/v1/carts',cartRouter);

app.use(unknownendpoint);


module.exports=app;