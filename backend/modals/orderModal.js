import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [{

        type: mongoose.ObjectId,
        ref: "Product"
    },
    ],
    payment:{},
    buyer:{
        type:mongoose.ObjectId,
        ref:"users"
    },
    status:{
        type:String,
        default:"not processing",
        enum:["not processing","processing","shipped","delivered","cancel"]
    }
},{timestamps:true})

const orderModal = mongoose.model("order", orderSchema)

export default orderModal;