import mongoose from "mongoose";
 const catgorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    }
 },{timestamps:true}
)

const catgory = mongoose.model ('category',catgorySchema);
export default catgory;
