const express = require('express');
const app = express();
const mongoose= require('mongoose');
const PORT = 5000;
const {MONGO_URI} = require('./keys')


mongoose.connect(MONGO_URI,{
    useUnifiedTopology: true
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