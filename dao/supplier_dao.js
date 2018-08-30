const {Supplier} = require("./model.js");

const SupplierDao = {
	// 保存职位信息
	save(supplierInfo) {
		return new Supplier(supplierInfo).save();
	},
	// 总记录条数
	count() {
		return Supplier.find().count();
	},
	// 按页查找职位信息
	findByPage(page) {
		// 假定每页显示5条数据
		const pageSize = 5;
		// 查询
		return Supplier.find().skip((page-1)*pageSize).limit(pageSize);
	},
	update() {

	},
	find() {

	},
	delete() {

	}
}

module.exports = SupplierDao;