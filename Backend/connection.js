import mongoose from "mongoose";

const URL = "mongodb+srv://warehouse:wareHouse123@cluster0.cxce2t4.mongodb.net/Funiture-Store?retryWrites=true&w=majority&appName=Cluster0";
mongoose.set("strictQuery",false);
export default mongoose.connect(URL)
