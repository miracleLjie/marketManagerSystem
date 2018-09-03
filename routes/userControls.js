const express = require('express');
const router = express.Router();
const userService = require("../services/userControl_services.js");


/* 添加职位 */
// http://localhost:3000/positions/add
router.post("/addUser", userService.adduser);

/* 按页查询 */
// http://localhost:3000/positions/list?page=2
router.get("/list", userService.listByPage);
//用户查询
// http://localhost:3000/positions/search
router.post("/searchControl", userService.searchControl);

router.post("/updateControl", userService.updateControl);

router.post("/deleteControl", userService.deleteControl);

module.exports = router;