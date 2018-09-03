function Bill(){
    this.gettime();
    this.addListener();
    this.load();
}
Bill.listInfoTemplate=`
<%for(var i=0; i<bills.length;i++){%>
<tr class="bill-tr" data-id="<%=bills[i]._id%>">
<td style="text-align: center" ><%=i+1%></td>
<td style="text-align: center" class="name"><%=bills[i].name%> </td>
<td style="text-align: center"><%=bills[i].company%></td>
<td style="text-align: center"><%=bills[i].provide%></td>
<td style="text-align: center"><%=bills[i].num%></td>
<td style="text-align: center"><%=bills[i].sum%></td>
<td style="text-align: center"><%=bills[i].pay%></td>
<td style="text-align: center"><%=bills[i].time%></td>
<td style="text-align: center; cursor: pointer;"><img class="read"  data-toggle="modal" data-target="#readModal" src="/images/read.png"><img class="update" data-toggle="modal" data-target="#updateModal" src="/images/updata.png"><img class="delete"  data-toggle="modal" data-target="#deleteModal" src="/images/delete.png"></td>
</tr>
<%}%>`;
Bill.searchInfoTemplate=`
<tr class="search-tr">
<td style="text-align: center" ><%=1%></td>
<td style="text-align: center" class="name"><%=bill.name%> </td>
<td style="text-align: center"><%=bill.company%></td>
<td style="text-align: center"><%=bill.provide%></td>
<td style="text-align: center"><%=bill.num%></td>
<td style="text-align: center"><%=bill.sum%></td>
<td style="text-align: center"><%=bill.pay%></td>
<td style="text-align: center"><%=bill.time%></td>
<td style="text-align: center; cursor: pointer;"><img class="read"  data-toggle="modal" data-target="#readModal" src="/images/read.png"><img class="update" data-toggle="modal" data-target="#updateModal" src="/images/updata.png"><img class="delete"  data-toggle="modal" data-target="#deleteModal" src="/images/delete.png"></td>
</tr>`;
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
        $(".btn-search").on("click",this.searhHandler);
    },
    searhHandler(){
            let name=$("#searchName").val();
            let provide=$("#searchProvide").val();
            let pay=$("#searchPay").val();
            console.log(pay);
            $.post("/bills/search",{name,provide,pay},(resData)=>{
                $(".wholeTbody").hide();
                $(".navigation").hide();
                if(resData.res_body.data[0]){
                const bill=resData.res_body.data[0];
                const html =ejs.render(Bill.searchInfoTemplate,{bill});
                $(".searchTbody").html(html);
                }else{
                    $(".search-tr").remove();
                }
            },"json")
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
            const html=ejs.render(Bill.listInfoTemplate,{bills});
            $(".list-table .wholeTbody").html(html);
            const pagination=ejs.render(Bill.paginationTemplate,{totalPages:data.res_body.totalPages,currentPage:page});
            $(".pagination").html(pagination);
        }).done(function(){
            $(".bill-tr").on("click",".delete",function(){
                let _tr=$(this).parents("tr");
                let _id=_tr.data("id");
                $(".btn-delete").click(function(){
                    $.post("/bills/delete",{_id},(resData)=>{
                        console.log(resData);
                    },"json");
                    location.href="/html/bill_manager.html";
                });
            });
        }).done(function(){
            $(".bill-tr").on("click",".read",function(){
                let _tr=$(this).parents("tr");
                let _id=_tr.data("id");
                let _code=_tr.children().eq(0).text();
                let _name=_tr.children().eq(1).text();
                let _company=_tr.children().eq(2).text();
                let _provide=_tr.children().eq(3).text();
                let _num=_tr.children().eq(4).text();
                let _sum=_tr.children().eq(5).text();
                let _pay=_tr.children().eq(6).text();
                $("#read-code").text(_code);
                $("#read-name").text(_name);
                $("#read-company").text(_company);
                $("#read-provide").text(_provide);
                $("#read-num").text(_num);
                $("#read-sum").text(_sum);
                $("#read-pay").text(_pay);
            });
        }).done(function(){
            $(".bill-tr").on("click",".update",function(){
                let _tr=$(this).parents("tr");
                let _id=_tr.data("id");
                let _name=_tr.children().eq(1).text();
                let _company=_tr.children().eq(2).text();
                let _provide=_tr.children().eq(3).text();
                let _num=_tr.children().eq(4).text();
                let _sum=_tr.children().eq(5).text();
                let _pay=_tr.children().eq(6).text();
                $("#up-id").val(_id);
                $("#up-name").val(_name);
                $("#up-company").val(_company);
                $("#up-provide").val(_provide);
                $("#up-num").val(_num);
                $("#up-sum").val(_sum);
                $("#up-pay").val(_pay);
                $(".btn-update").click(function(){
                    var Update= $(".update-form").serialize();
                    $.post("/bills/update",Update,(resData)=>{
                        console.log(resData);
                    },"json");
                    location.href="/html/bill_manager.html";
                });
            });
        })
    },
    addHeadler(){
        var data=$(".add-form").serialize();
        $.post("/bills/add",data,(resData)=>{
            console.log(resData);
        },"json");
        location.href="/html/bill_manager.html";
    },
    gettime(){
        $("#time").val($(".time").text().slice(0,10));
    }
});

new Bill();