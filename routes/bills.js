const express=require("express");
const router=express.Router();
const path=require("path");
const BillService=require("../services/bill_service.js");

router.post("/add",BillService.add);
router.get("/list",BillService.listByPage);
module.exports=router;