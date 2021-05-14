import express from 'express';
const app = express();
import mongoose from 'mongoose';
const PORT = 5000;
import KEYS  from './keys.js';
const { MONGO_URI } = KEYS;
// import User from './models/user.js';
// import Post from './models/post.js';
import authRouter from './routes/auth.js';
import postRouter from './routes/post.js';
import userRouter from './routes/user.js';
import cors from 'cors';

app.use(cors());

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

app.use(express.json());
app.use(authRouter, postRouter, userRouter);

app.listen(PORT, ()=>{
    console.log("server is running on port", PORT)
});


