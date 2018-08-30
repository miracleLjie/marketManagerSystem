var express = require('express');
var router = express.Router();
const userService = require("../services/user_services.js");
// 用户登录
router.post("/login", userService.login);
// 退出
router.get("/logout", userService.logout);

module.exports = router;
