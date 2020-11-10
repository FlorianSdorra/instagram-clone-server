import express from 'express';
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('hello')
});

router.post('/signup', (req, res)=>{
    const {name, email, password} = req.body;
    return !email || !password || !name ? res.status(422).json({error:"please add all required fields"}) : res.json({message:"successfully signed up"})
})

const userRouter = router

export default userRouter