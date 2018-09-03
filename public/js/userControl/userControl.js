function user() {
    this.addListener();
    this.load();
}

user.listInfoTemplate = `
				<% for (var i = 0; i < users.length; i++) { %> 
                <tr>
                    <td><%=users[i].number%></td>
                    <td><%= users[i].username %></td>
                    <td><%= users[i].sex %></td>
                    <td><%= users[i].birth %></td>
                    <td><%= users[i].phone %></td>
                    <td><%= users[i].usersClass %></td>
                    <td>
                        <a href="javascript:void(0)""><img src="/images/read.png" alt="查看" title="查看"/></a>
                        <a href="javascript:void(0)" data-toggle="modal" class="updateControlHandle" data-target="#UpdateControlModal" ><img src="/images/xiugai.png" alt="修改" title="修改"/></a>
                        <a href="javascript:void(0)" class="removeProvider deleteControlHandle"><img src="/images/schu.png" alt="删除" title="删除"/></a>
                    </td>
                </tr>
                <% } %>`;

user.searchInfoTemplate = `
<tr>
<td><%= user.number %></td>
<td><%= user.username %></td>
<td><%= user.sex %></td>
<td><%= user.birth %></td>
<td><%= user.phone %></td>
<td><%= user.usersClass %></td>
<td>
    <a href="javascript:void(0)""><img src="/images/read.png" alt="查看" title="查看"/></a>
    <a href="javascript:void(0)" class="updateControlHandle"><img src="/images/xiugai.png" alt="修改" title="修改"/></a>
    <a href="javascript:void(0)" class="removeProvider deleteControlHandle"><img src="/images/schu.png" alt="删除" title="删除"/></a>
</td>
</tr>
				`;

user.paginationTemplate = `
	<% for (var i = 1; i <= totalPages; i++)  {%>
		<li class="<%= currentPage == i ? 'active' : '' %>"><a href="#"><%= i %></a></li>
    <% } %>`;

$.extend(user.prototype, {
    // 注册事件监听 
    addListener() {
        // 添加用户
        $(".btn-add-user").on("click", this.addUserHandler);
        $(".pagination").on("click", "a", this.loadByPage);
        // $(".searchControl_name").on("blur", this.searhControlHandler);
        $(".searchControl_search").on("click", this.searhControlHandler);
        $(".userTable").on("click", ".deleteControlHandle ", function(event) {
            username = $(event.target).parents("tr").children().eq(1).text();
            console.log(username);

            $.post("/userControls/deleteControl", { username }, (resData) => {

                console.log(resData);
                location.href = "/html/userControl.html";
            });

        });
        $(".userTable").on("click", ".updateControlHandle ", function(event) {
            number = $(event.target).parents("tr").children().eq(0).text();
            username = $(event.target).parents("tr").children().eq(1).text();
            let sexs = $(event.target).parents("tr").children().eq(2).text();
            birth = $(event.target).parents("tr").children().eq(3).text();
            phone = $(event.target).parents("tr").children().eq(4).text();
            usersClass = $(event.target).parents("tr").children().eq(5).text();

            console.log(number, sexs, birth, phone, usersClass);
            $("#UpdateControlNumber").val(number);
            $("#UpdateControlName").val(username);
            $("." + sexs).attr({ selected: "selected" });
            $("#UpdateControlBirth").val(birth);
            $("#UpdateControlPhone").val(phone);
            $("#" + usersClass).attr({ checked: "checked " });
        });
        $(".btn-upDate-user").on("click", function() {
            let data = $(".update-users-form").serializeArray();
            let sex = $(".update-users-form select").val();
            data.push({ "name": "sex", "value": sex });
            console.log(data);
            $.post("/userControls/updateControl", data, (resData) => {

                console.log(resData);
                // if(res_code)
            }, "json");
            location = "/html/userControl.html";
        });
    },


    // 页面加载
    load() {
        // // 让“职位管理”导航选中
        // $("#bs-example-navbar-collapse-1 ul:first li:last")
        //     .addClass("active")
        //     .siblings("li")
        //     .removeClass("active");
        // 加载第一页数据
        this.loadByPage(1);
    },
    searhControlHandler() {
        let username = $(".searchControl_name").val();
        console.log(username);
        $.post("/userControls/searchControl", { username }, (resData) => {

            if (resData.res_body[0]) {
                $(".listInfoTemplate").hide();
                let user = resData.res_body[0];
                console.log(user);
                let html = ejs.render(user.searchInfoTemplate, { user: user });
                $(".searchInfoTemplate").html(html);
            } else {
                // $(".search-tr").remove();
            }
        });
    },

    // 按页加载数据
    loadByPage(event) {
        let page;
        if (typeof event === "number") // 直接传递页码
            page = event;
        else { // 获取待加载页码			
            console.log(event.target)
            page = $(event.target).text();
        }

        // 读取page页数据
        $.getJSON("/userControls/list?page=" + page, data => {
            // 显示职位数据
            // 待渲染的数据
            const Users = data.res_body.data;
            console.log(data.res_body.totalPages);
            // EJS渲染模板
            const html = ejs.render(user.listInfoTemplate, { users: Users });
            // 显示
            $(".listInfoTemplate").html(html);

            // 显示页码数据
            const pagination = ejs.render(user.paginationTemplate, { totalPages: data.res_body.totalPages, currentPage: page })
            $(".pagination").html(pagination);
        });
    },
    // 添加职位
    addUserHandler() {
        let data = $(".add-users-form").serializeArray();
        let sex = $(".add-users-form select").val();
        let usersClass = $(".label_checked input[name='radio']:checked").val();
        data.push({ "name": "sex", "value": sex });
        data.push({ "name": "usersClass", "value": usersClass });
        $.post("/userControls/addUser", data, (data) => {
            console.log(data);
        }, "json");
        location = "/html/userControl.html";
        // 创建 FormData 对象：包装待上传表单的数据
        // const formData = new FormData($(".add-users-form").get(0));
        // 使用 $.ajax() 方法
        // $.ajax({
        //     type: "post",
        //     url: "/passwordUpdates/addUser",
        //     data: formData,
        //     processData: false, // 禁止将 data 转换为查询字符串
        //     contentType: false, // 不设置contentType
        //     success: function(data) {
        //         console.log(data);
        //     },
        //     dataType: "json"
        // })
    }
});

new user();