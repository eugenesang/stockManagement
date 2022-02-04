const mongoose=require("mongoose");

const itemSchema=new mongoose.Schema({
    name:{type:String},
    quantity:{type:Number},
    price:{type:Number},
    description:{type:String}
});
module.exports=mongoose.model("Item", itemSchema);