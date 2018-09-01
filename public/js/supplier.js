function supplier() {
    this.addListener();
    this.load();
}
// 数据行模板
supplier.listInfoTemplate = `
				<% for (var i = 0; i < suppliers.length; i++) { %> 
                <tr data-id="<%= suppliers[i]._id %>">
                    <td><%= i+1 %></td>
                    <td><%= suppliers[i].name %></td>
                    <td><%= suppliers[i].linkman %></td>
                    <td><%= suppliers[i].phone %></td>
                    <td><%= suppliers[i].adress %></td>
                    <td><%= suppliers[i].fax %></td>
                    <td><%= suppliers[i].time %></td>
                    <td>
                        <a href="#" data-toggle="modal" data-target=".viewModal" class="view-suppplierInfo"><img src="/images/read.png" alt="查看" title="查看"/></a>
                        <a href="#" data-toggle="modal" data-target="#updateModal" class="updateSupplier"><img src="/images/xiugai.png" alt="修改" title="修改"/></a>
                        <a href="#" data-toggle="modal" data-target=".deleteModal" class="removeSupplier"><img src="/images/schu.png" class = "deleteImg" alt="删除" title="删除"/></a>
                    </td>
                </tr>
				<% } %>`;
// 查询数据模板
supplier.findInfoTemplate = `
					<tr>
						<td><%= 1 %></td>
						<td><%= sups.name %></td>
						<td><%= sups.linkman %></td>
						<td><%= sups.phone %></td>
						<td><%= sups.adress %></td>
						<td><%= sups.fax %></td>
						<td><%= sups.time %></td>
						<td>
							<a href="#" data-toggle="modal" data-target=".viewModal" class="view-suppplierInfo"><img src="/images/read.png" alt="查看" title="查看"/></a>
							<a href="#" data-toggle="modal" data-target="#updateModal" class="updateSupplier"><img src="/images/xiugai.png" alt="修改" title="修改"/></a>
							<a href="#" data-toggle="modal" data-target=".deleteModal" class="removeSupplier"><img src="/images/schu.png" class = "deleteImg" alt="删除" title="删除"/></a>
						</td>
					</tr>`
// 分页模板
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
		// 查询供应商
		$("._search").on("click",this.searchSupplier);
	},
	// 查询
	searchSupplier(){
		let name = $(".supplier_name").val();
		// ajax提交登录处理
		$.post("/suppliers/find", {name}, (resData)=>{
			// console.log(resData.res_body[0]);
			$(".t_body").hide();
			$(".navigation").hide();
			// 待渲染的数据
			const sups = resData.res_body[0];
			// EJS渲染模板
			const html = ejs.render(supplier.findInfoTemplate, {sups});
			// 显示
			$(".supplierTable .s_body").html(html);
			
		}, "json");
		
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
			// console.log(event.target)
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
			$(".supplierTable .t_body").html(html);

			// 显示页码数据
			const pagination = ejs.render(supplier.paginationTemplate, {totalPages: data.res_body.totalPages, currentPage : page})
			$(".pagination").html(pagination);
		}).done(function(){
			// 删除
			$("tr").on("click",".deleteImg",function(){
				let _tr = $(this).parents("tr");
				let _id = _tr.data("id");
				$(".btn-delete").on("click",function(){
					// ajax提交删除处理
					$.post("/suppliers/delete", {_id}, (resData)=>{
					console.log(resData);
					}, "json");
					location.href="/html/supplier.html";
				})
			});
		}).done(function(){
			// 修改供应商信息
			$(".updateSupplier").on("click",function(){
				// 从页面上获取供应商信息
				let _tr = $(this).parents("tr"),
					_id = _tr.data("id");
					_name = _tr.children().eq(1).text(),
					_linkman = _tr.children().eq(2).text(),
					_phone = _tr.children().eq(3).text(),
					_adress = _tr.children().eq(4).text(),
					_fax = _tr.children().eq(5).text();
				// 将获取的供应商信息添加至修改模态框对应条目中
				$(".update-supplier-form #upNumber").val(_id);
				$(".update-supplier-form #upName").val(_name);
				$(".update-supplier-form #upLinkman").val(_linkman);
				$(".update-supplier-form #upPhone").val(_phone);
				$(".update-supplier-form #upAdress").val(_adress);
				$(".update-supplier-form #upFax").val(_fax);
				$(".btn-update-sup").on("click",function(){
					// 包装修改模态框里面的数据
					var Updata = $(".update-supplier-form").serialize();
					// ajax提交登录处理
					$.post("/suppliers/update", Updata, (resData)=>{
						console.log(resData);
					}, "json");
					location.href="/html/supplier.html";
				})
			})
		}).done(function(){
			$(".view-suppplierInfo").on("click",function(){
				let _tr = $(this).parents("tr"),
					_id = _tr.data("id");
					_name = _tr.children().eq(1).text(),
					_linkman = _tr.children().eq(2).text(),
					_phone = _tr.children().eq(3).text(),
					_adress = _tr.children().eq(4).text(),
					_fax = _tr.children().eq(5).text();
					_time = _tr.children().eq(6).text();
				$(".view-content-body .vnumber").text(_id);
				$(".view-content-body .vname").text(_name);
				$(".view-content-body .vlinkman").text(_linkman);
				$(".view-content-body .vphone").text(_phone);
				$(".view-content-body .vadress").text(_adress);
				$(".view-content-body .vfax").text(_fax);
				$(".view-content-body .vtime").text(_time);
			})
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
		location.href="/html/supplier.html"
    },
    getTime(){
        let currentTime = new Date().toDateString();
        $("#addTime").val(currentTime);
    }
});
new supplier();