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
    update(){

    },
    find(){

    },
    delete(){

    }
}
module.exports=BillDao;