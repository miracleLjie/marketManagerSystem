const express = require('express');
const router = express.Router();
const path = require("path");
const SupplierService = require("../services/supplier_services.js");

/* 添加职位 */
// http://localhost:3000/suppliers/add
router.post("/add", SupplierService.add);

/* 按页查询 */
// http://localhost:3000/suppliers/list?page=
router.get("/list", SupplierService.listByPage);

// 删除供应商信息
router.post("/delete",SupplierService.deleteById);

// 修改供应商信息
router.post("/update",SupplierService.updateSupplier);

// 查询信息
router.post("/find",SupplierService.findSupplier);


module.exports = router;
