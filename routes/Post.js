import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import requireLogin from '../middleware/requireLogin.js';
import Post from '../models/post.js';



router.get('/allposts', requireLogin, (req,res)=>{
    Post.find()
    .populate('postedBy', '_id, name')
    .populate('comments.postedBy', '_id name')
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost', requireLogin, (req, res)=>{
    console.log(req.body);
    const {title, body, pic} = req.body;

    if(!title || !body || !pic){
        return res.status(422).json({errror:"Please add all the fields"})
    }
    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy: req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/myposts',requireLogin, (req, res)=>{
    Post.find({postedBy:req.user.id})
    .populate('postedBy', '_id, name')
    .then(myposts=>{
        res.json({myposts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/like', requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err, result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/unlike', requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err, result)=>{
        if(err){
            return res.status(422).json({err:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/comment', requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy", "_id name")
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

const postRouter = router;

export default postRouter;