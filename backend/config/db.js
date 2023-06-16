import mongoose from "mongoose";

const connectDb = async() =>{
    try{
        const conn = await mongoose.connect(`${process.env.MONGO_DB_URL}/ecommerce`)
        console.log("you are connect to" + {conn})
    }catch(err){
        console.log(err)
    }
}

export default connectDb;