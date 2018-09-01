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
	// 修改供应商信息
	update(updateInfo) {
		return Supplier.update({_id:updateInfo.Upnumber},{$set:{
			name:updateInfo.Upname,
			linkman:updateInfo.Uplinkman,
			phone:"123",
			adress:updateInfo.Upadress,
			fax:updateInfo.Upfax
		}});
	},
	find(name) {
		return Supplier.find(name);
	},
	// 删除供应商信息
	delete(info) {
		return Supplier.remove(info);
	}
}

module.exports = SupplierDao;