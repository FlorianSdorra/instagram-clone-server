import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

router.get('/', (req, res)=>{
    res.send('hello')
});

router.post('/signup', (req, res)=>{
    const {name, email, password} = req.body;
    if(!email || !password || !name){
        return res.status(422).json({error:"please add all required fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with this email"})
        }
        bcrypt.hash(password, 12)
        .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
    
            user.save()
                .then(user=>{
                    res.json({message: "You signed up succesfully"})
                })
                .catch(err=>{
                    console.log(err)
                })
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

router.post('/signin',(req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"please add email AND password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Wrong email or password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                return res.json({message: "Youre signed in"})
            }
            else{
                return res.status(422).json({error:"Wrong email or password"})
            }
        })
        
    })
})

const userRouter = router

export default userRouter