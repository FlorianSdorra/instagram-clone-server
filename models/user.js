import mongoose from 'mongoose';
const {Schema} = mongoose;
const { ObjectId} = mongoose.Schema.Types;

const userSchema = new Schema ({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    followers:[{
        type:ObjectId,
        ref:"User"
    }],
    following:[{
        type:ObjectId,
        ref:"User"
    }]
})

const User = mongoose.model('User', userSchema);

export default User;