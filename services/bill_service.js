const BillDao=require("../dao/bill_dao.js");
const BillService={
    add(req,res,next){
    const {name,company,num,sum,provide,pay,time}=req.body;
    BillDao
    .save({name,company,num,sum,provide,pay,time})
    .then((data)=>{
        res.json({res_code:1,res_error:"",res_body:data});
    })
    .catch((err)=>{
        res.json({res_code:0,res_error:err,res_body:{}});
    })
    },
    listByPage(req,res,next){
        let {page}=req.query;
        page=page||1;
        BillDao
        .count()
        .then((data)=>{
            BillDao
            .findByPage(page)
            .then(pageData=>{
                const totalPages=Math.ceil(data/5);
                res.json({res_code:1,res_error:"",res_body:{data:pageData,count:data,totalPages}});
            }).catch(err=>{
                res.json({res_code:-1,res_error:err,res_body:{}});
            });
    }).catch(err=>{
        res.json({res_code:-1,res_error:err,res_body:{}});
    });
    },
    delete(req,res,next){
        const {_id}=req.body;
        BillDao.delete({_id})
        .then(data=>{
            res.json({res_code:1,res_error:"",res_body:{data}});
        }).catch(err=>{
            res.json({res_code:-1,res_error:err,res_body:{}});
        })
    },
    update(req,res,next){
        const {upId,upname,upcompany,upnum,upsum,upprovide,uppay}=req.body;
        BillDao.update({upId,upname,upcompany,upnum,upsum,upprovide,uppay})
        .then(data=>{
            res.json({res_code:1,res_error:"",res_body:{data}});
        }).catch(err=>{
            res.json({res_code:-1,res_error:err,res_body:{}});
        })
    },
    search(req,res,next){
        const {name,provide,pay}=req.body;
        BillDao.find({name,provide,pay})
        .then(data=>{
            res.json({res_code:1,res_error:"",res_body:{data}});
        }).catch(err=>{
            res.json({res_code:0,res_error:err,res_body:{}});
        })
    }
}

module.exports=BillService;