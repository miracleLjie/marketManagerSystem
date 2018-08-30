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

module.exports = router;
