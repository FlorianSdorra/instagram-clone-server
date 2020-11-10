import express from 'express';
const app = express();
import mongoose from 'mongoose';
const PORT = 5000;
import MONGO_URI  from './keys.js';

import User from './models/user.js';
import userRouter from './routes/User.js';

app.use(express.json());
app.use(userRouter);

mongoose.connect(MONGO_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection.on('connected',()=>{
    console.log('connected to mongoose')
})

mongoose.connection.on('error',(err)=>{
    console.log('error in connection', err)
})

app.listen(PORT, ()=>{
    console.log("server is running on port", PORT)
});
