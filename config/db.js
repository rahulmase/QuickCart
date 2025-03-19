import mongoose from "mongoose";

let cached = global.mongoose

if(!cached)
{
    cached = global.mongoose = {  conn: null, promise: null }

}
async function connnectDB()
{
 
    if(cached.conn)
    {
        return cached.conn
    }
    
    if(!cached.promise)
    {
        const opts =
        {
           bufferCommands:false
        }

        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/quickcart`, opts).then(mongoose=> {
            return mongoose
<<<<<<< HEAD
        })        
=======
        })
            
        
>>>>>>> eb06f3252278edea2fb2d68b0c4fe31864d4dc5b
    }

    cached.conn = await cached.promise
    return cached.conn

}
export default connnectDB
