const userDao = require("../dao/userControl_dao.js");
const bcrypt = require("bcrypt"); //用户名加密

const userService = {
    // 添加职位
    adduser(req, res, next) {
        // 从请求主体中解构文本数据
        const { number, username, sex, birth, phone, usersClass, password, repassword } = req.body;
        // 保存到数据库
        if (!password === repassword)
            return;
        // const passCrypt = bcrypt.hashSync(password, 10);
        userDao
            .save({ number, username, sex, birth, phone, usersClass, password })
            .then(data => {
                res.json({ res_code: 1, res_error: "", res_body: data })
            })
            .catch(err => {
                res.json({ res_code: -1, res_error: err, res_body: {} })
            });
    },
    searchControl(req, res, next) {
        // 从请求主体中解构文本数据
        const { username } = req.body;
        userDao
            .find({ username })
            .then(data => {
                res.json({ res_code: 1, res_error: "", res_body: data })
            })
            .catch(err => {
                res.json({ res_code: -1, res_error: err, res_body: {} })
            });
    },
    updateControl(req, res, next) {
        // 从请求主体中解构文本数据
        const { number, username, sex, birth, phone, usersClass } = req.body;
        userDao
            .update({ number, username, sex, birth, phone, usersClass })
            .then(data => {
                res.json({ res_code: 1, res_error: "", res_body: data })
            })
            .catch(err => {
                res.json({ res_code: -1, res_error: err, res_body: {} })
            });
    },
    deleteControl(req, res, next) {
        const { username } = req.body;
        userDao.delete({ username })
            .then(data => {
                res.json({ res_code: 1, res_error: "", res_body: { data } });
            }).catch(err => {
                res.json({ res_code: -1, res_error: err, res_body: {} });
            })
    },
    // 分页查询职位
    listByPage(req, res, next) {
        // 获取待查询的页码
        let { page } = req.query;
        page = page || 1;
        // 调用数据库查询方法
        userDao
            .count()
            .then((data) => {
                userDao
                    .findByPage(page)
                    .then(pageData => {
                        // 总页数
                        const totalPages = Math.ceil(data / 10);
                        res.json({ res_code: 1, res_error: "", res_body: { data: pageData, count: data, totalPages } });
                    }).catch(err => {
                        res.json({ res_code: -1, res_error: err, res_body: {} });
                    });
            }).catch(err => {
                res.json({ res_code: -1, res_error: err, res_body: {} });
            });
    }
}

module.exports = userService;