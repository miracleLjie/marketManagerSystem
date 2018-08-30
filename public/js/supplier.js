function supplier() {
    this.addListener();
    this.load();
}

supplier.listInfoTemplate = `
				<% for (var i = 0; i < suppliers.length; i++) { %> 
                <tr>
                    <td><%= i+1 %></td>
                    <td><%= suppliers[i].name %></td>
                    <td><%= suppliers[i].linkman %></td>
                    <td><%= suppliers[i].phone %></td>
                    <td><%= suppliers[i].adress %></td>
                    <td><%= suppliers[i].fax %></td>
                    <td><%= suppliers[i].time %></td>
                    <td>
                        <a href="javascript:void(0)""><img src="/images/read.png" alt="查看" title="查看"/></a>
                        <a href="javascript:void(0)"><img src="/images/xiugai.png" alt="修改" title="修改"/></a>
                        <a href="javascript:void(0)" class="removeProvider"><img src="/images/schu.png" alt="删除" title="删除"/></a>
                    </td>
                </tr>
				<% } %>`;

supplier.paginationTemplate = `
	<% for (var i = 1; i <= totalPages; i++)  {%>
		<li class="<%= currentPage == i ? 'active' : '' %>"><a href="#"><%= i %></a></li>
	<% } %>`;

$.extend(supplier.prototype, {
	// 注册事件监听 
	addListener() {
		// 添加职位
		$(".btn-add-sup").on("click", this.addSupplierHandler);
		// 翻页
        $(".pagination").on("click","li", this.loadByPage);
        // 获取当前时间
        $(".addSupplier").on("click",this.getTime);
    },
    load(){
        this.loadByPage(1);
    },
	// 按页加载数据
	loadByPage(event){
		let page;
		if (typeof event === "number") // 直接传递页码
			page = event;
		else { // 获取待加载页码			
			console.log(event.target)
			page = $(event.target).text();
		}

		// 读取page页数据
		$.getJSON("/suppliers/list?page=" + page, data=>{
			// 显示职位数据
			// 待渲染的数据
			const suppliers = data.res_body.data;
			// EJS渲染模板
			const html = ejs.render(supplier.listInfoTemplate, {suppliers});
			// 显示
			$(".supplierTable tbody").html(html);

			// 显示页码数据
			const pagination = ejs.render(supplier.paginationTemplate, {totalPages: data.res_body.totalPages, currentPage : page})
			$(".pagination").html(pagination);
		});
	},
	// 添加供应商
	addSupplierHandler() {
		// 创建 FormData 对象：包装待上传表单的数据
        var data = $(".add-supplier-form").serialize();
		// ajax提交登录处理
		$.post("/suppliers/add", data, (resData)=>{
			console.log(resData);
        }, "json");
        $(".add-supplier-form input").val("");
    },
    getTime(){
        let currentTime = new Date().toDateString();
        $("#addTime").val(currentTime);
    }
});
new supplier();