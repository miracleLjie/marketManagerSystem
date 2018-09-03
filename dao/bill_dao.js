const {Bill}=require("./model.js");
const BillDao={
    save(billInfo){
        return new Bill(billInfo).save();
    },
    count(){
        return Bill.find().count();
    },
    findByPage(page){
        const pageSize=5;
        return Bill.find().skip((page-1)*pageSize).limit(pageSize);
    },
    update(updateInfo){
        return Bill.update({_id:updateInfo.upId},{$set:
            {
            name:updateInfo.upname,
            company:updateInfo.upcompany,
            num:updateInfo.upnum,
            sum:updateInfo.upsum,
            provide:updateInfo.upprovide,
            pay:updateInfo.uppay
        }
    })
    },
    find({name,provide,pay}){
        return Bill.find({name,provide,pay});
    },
    delete(info){
        return Bill.remove(info);
    }
}
module.exports=BillDao;