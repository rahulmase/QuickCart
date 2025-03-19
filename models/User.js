import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    _id:{type: String, required: true },
    name:{type: String, required: true },
    email:{type: String, required: true,unique: true },
<<<<<<< HEAD
   imageUrl:{type: String, required: true },
=======
    imageUrl :{type: String, required: true },
    cartItems: {type:Object, default:{} }
>>>>>>> eb06f3252278edea2fb2d68b0c4fe31864d4dc5b

    cartItems:{type:Object, default:{} }    
}, { minimize: false })

const User = mongoose.models.user || mongoose.model('user',userSchema)

export default User
