const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/marketManagerSystem");
const Bill=mongoose.model("bill",{
    name:String,
    company:String,
    num:Number,
    sum:Number,
    provide:String,
    pay:String,
    time:String
});
module.exports={Bill};