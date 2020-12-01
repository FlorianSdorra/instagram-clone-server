import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import requiredLogin from '../middleware/requireLogin.js';
import Post from '../models/post.js';


router.post('/createpost', requiredLogin, (req, res)=>{
    const {title, body} = req.body;

    if(!title || !body){
        return res.status(422).json({errror: "Please add all the fields"})
    }
    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        postedBy: req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

const postRouter = router;

export default postRouter;