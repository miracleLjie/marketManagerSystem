// 引入 mongoose
const mongoose = require("mongoose");
// 连接数据库
mongoose.connect('mongodb://localhost/marketManagerSystem');

// 用户模型
const User = mongoose.model("user", {
	username: String,
	password: String
});

// 供应商模型
const Supplier = mongoose.model("supplier", {
	number:String,
	name: String,
	linkman: String,
	phone: Number,
	adress: String,
	fax:String,
	time:String
});
const Bill=mongoose.model("bill",{
    name:String,
    company:String,
    num:Number,
    sum:Number,
    provide:String,
    pay:String,
    time:String
});

module.exports = {User,Supplier,Bill};
