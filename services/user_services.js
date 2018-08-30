const userDao = require("../dao/user_dao.js");
const bcrypt = require("bcrypt");//用户名加密

const userService = {
    login(req,res,next){
        // 获取登录时的用户名、密码
        const {username,password} = req.body;
        userDao.find({username})//先查询用户信息
                .then(data=>{//找到{username}
                    if (data.length === 1) {//用户存在
                        const _pass = data[0].password;
                        if (bcrypt.compareSync(password,_pass)) {
                            res.json({res_code:1,res_error:"",res_body:data[0]});
                        }else{
                            res.json({res_code:0,res_error:"密码错误",res_body:{}});
                        }
                    }else{
                        res.json({res_code:0,res_error:"用户名不存在",res_body:{}});
                    }
                })
                .catch(err=>{//未找到{username}
                    res.json({res_code:-1,res_error:err,res_body:{}});
                })
    },
    logout(req, res, next) {
		req.session.loginUser = null;
		res.json({res_code:1, res_error:"", res_body:{status: true}});
	},
};
module.exports = userService;