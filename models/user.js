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
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dec8enu1mx13x12/image/upload/v1623160132/no-image-icon_i0fzlw.svg"
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