import mongoose from "mongoose";
const ProductSchema  = new mongoose.Schema({
    
  
    title :{type :String,required :true },
    description :{type:String ,required :true},
    price:{
        type:String,
        required :true
    },
    category :{
        type:String,

    },
    stock:{
        type:Number,default :0
    },
    imageUrl:{
        type:String
    },
    createdBy :{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},
{timestamps:true}
);


export default mongoose.model('Product',ProductSchema);