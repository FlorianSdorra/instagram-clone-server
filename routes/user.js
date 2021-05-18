import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import requireLogin from '../middleware/requireLogin.js';
import Post from '../models/post.js';
import User from '../models/user.js';

router.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy", "_id name")
        .exec((err, posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user, posts})
        })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})


const userRouter = router;

export default userRouter;