const { User } = require("./model.js");

const userDao = {
    // 保存职位信息
    save(userInfo) {
        const user = new User(userInfo);
        return new User(userInfo).save();
    },
    // 总记录条数
    count() {
        return User.find().count();
    },
    // 按页查找职位信息
    findByPage(page) {
        // 假定每页显示5条数据
        const pageSize = 10;
        // 查询
        return User.find().skip((page - 1) * pageSize).limit(pageSize);

        /*const query = Position.find(); // 查询结果集
        const count = query.count(); // 文档总条数
        const totalPages = Math.ceil(count / pageSize); // 总页数
        const positions = query.skip((page-1)*pageSize).limit(pageSize); // 当页职位数据
        // 返回总记录条数、总页数与当前页职位数据
        return {count, totalPages, positions};*/
    },
    update(updateInfo) {
        return User.update({ username: updateInfo.username }, {
            $set: {
                number: updateInfo.number,
                username: updateInfo.username,
                sex: updateInfo.sex,
                birth: updateInfo.birth,
                phone: updateInfo.phone,
                address: updateInfo.address,
                usersClass: updateInfo.usersClass
            }
        })
    },
    find(username) {
        return User.find(username);
    },
    delete(deleteinfo) {
        return User.remove(deleteinfo);
    }
}

module.exports = userDao;