function Bill(){
    this.gettime();
    this.addListener();
    this.load();
}
Bill.listInfoTemplate=`
<%for(var i=0; i<bills.length;i++){%>
<tr>
<td style="text-align: center"><%=i+1%></td>
<td style="text-align: center"><%=bills[i].name%> </td>
<td style="text-align: center"><%=bills[i].company%></td>
<td style="text-align: center"><%=bills[i].sum%></td>
<td style="text-align: center"><%=bills[i].pay%></td>
<td style="text-align: center"><%=bills[i].time%></td>
<td style="text-align: center; cursor: pointer;"><img id="read"  data-toggle="modal" data-target="#readModal" src="/images/read.png"><img id="update" data-toggle="modal" data-target="#updateModal" src="/images/updata.png"><img id="delete" src="/images/delete.png"></td>
</tr>
<%}%>`;
Bill.paginationTemplate=`
    <%for(var i=1;i<=totalPages;i++){%>
        <li class="<%=currentPage==i?"active":""%>"><a href="#"><%=i%></a></li>
        <%}%>`;
$.extend(Bill.prototype,{
    load(){
        this.loadByPage(1);
    },
    addListener(){
        $(".add-btn").on("click",this.addHeadler);
        $(".pagination").on("click","li",this.loadByPage);
    },
    loadByPage(event){
        let page;
        if(typeof event ==="number"){
            page=event;
        }else{
            page=$(event.target).text();
        }
        $.getJSON("/bills/list?page="+page,data=>{
            const bills=data.res_body.data;
            console.log(bills);
            const html=ejs.render(Bill.listInfoTemplate,{bills});
            $(".list-table tbody").html(html);
            const pagination=ejs.render(Bill.paginationTemplate,{totalPages:data.res_body.totalPages,currentPage:page});
            $(".pagination").html(pagination);
        });
    },
    addHeadler(){
        var data=$(".add-form").serialize();
        $.post("/bills/add",data,(resData)=>{
            console.log(resData);
        },"json");
    },
    gettime(){
        $("#time").val($(".time").text().slice(0,10));
    }
});

new Bill();