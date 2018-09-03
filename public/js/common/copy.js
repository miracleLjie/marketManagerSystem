function Copy() {
    this.createDom();
    this.fn();
    this.addListener();
    this.load();
}
Copy.template = `<nav class="navbar navbar-default" style="background: linear-gradient(to bottom,#60acf0,#64a5df,#62a0dd,#5994d6,#4f8ace,#4880ca);margin-bottom:0; ">
<div class="container-fluid">
  <!-- Brand and toggle get grouped for better mobile display -->
  <div class="navbar-header">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="/"style="background:url(/images/buy.png) 30px center no-repeat;color:#fff;font-size: 22px;padding-left: 80px;">超市账单管理系统</a>
  </div>

  <!-- Collect the nav links, forms, and other content for toggling -->
    <ul class="nav navbar-nav navbar-right" style="margin-right: 30px;margin-top: 2px;">
      <li><div class="btn-group">
            <div class="login-success hide" style="display: inline-block;float: left;color:#fff;margin-top: 12px;margin-right: 5px;">
                你好！xxx
            </div>
            <button class="btn link-logout hide" style="background-color: #8bc93a;color:#fff;border-radius: 5px;margin-top:6px;">退出</button>
            <button class="btn link-login" style="margin-right: 5px;margin-top:6px;background-color: #8bc93a;color:#fff;border-radius: 5px;">登录</button>
            
          </div></li>
    </ul>
  </div><!-- /.navbar-collapse -->
</div><!-- /.container-fluid -->
</nav>
<section class="navbar navbar-default" style="min-height: 28px;line-height: 28px;margin-bottom: 0;">
<span class="pull-left time" style="margin-left: 30px;padding-left: 26px;background: url(/images/time.png) left center no-repeat;font-size: 12px;"></span>
<span class="pull-right" style="margin-right:30px;font-size: 12px;">温馨提示：为了能正常浏览，请使用高版本浏览器！（IE10+）</span>
</section>
<div class="left pull-left" style="width: 168px;min-height:520px;margin-right: 10px;background: url(/images/leftBg.png) 0 0 repeat-y">
<div class="list-group" style="width: 140px;text-align: center;margin:0 auto;">
<h4 href="#" class="list-group-item" style="background-color: #60b3e7;color: #fff">
        <span style="width: 10px;
        height: 10px;
        display: inline-block;
        background: radial-gradient(#70c2f4,#3a8dc1, #035384, #4696c7,#83d1f5);
        border-radius: 50%;"></span>
        功能列表
        <span style="width: 10px;
        height: 10px;
        display: inline-block;
        background: radial-gradient(#70c2f4,#3a8dc1, #035384, #4696c7,#83d1f5);
        border-radius: 50%;"></span>
</h4>
<a href="/html/bill_manager.html" class="list-group-item list-group-item-info" style="background: url(/images/zd.png) 0 center no-repeat;color: #0042a8;">账单管理</a>
<a href="/html/supplier.html" class="list-group-item list-group-item-info supplier" style="background: url(/images/gys.png) 0 center no-repeat;color: #0042a8;">供应商管理</a>
<a href="/html/userControl.html" class="list-group-item list-group-item-info userControl" style="background: url(/images/yh.png) 0 center no-repeat;color: #0042a8;">用户管理</a>
<a href="/html/passwordUpdate.html" class="list-group-item list-group-item-info passwordUpate" style="background: url(/images/mm.png) 0 center no-repeat;color: #0042a8;">密码修改</a>
<a href="#" class="list-group-item list-group-item-info" style="background: url(/images/tc.png) 0 center no-repeat;color: #0042a8;">退出系统</a>
</div>
</div>`;
$.extend(Copy.prototype, {
    createDom() {
        $(Copy.template).appendTo("header");
    },
    addListener() {
        setInterval(this.fn, 1000);
        $(".list-group").on("click", "a", this.clickHandler);
        // index登录按钮
        $(".link-login").on("click", this.loginHandler);
        // index退出按钮

        $(".link-logout").on("click", this.logoutHandler);
        // 退出系统
        $(".quitSystem").on("click", this.quitSystem)
    },
    quitSystem() {
        sessionStorage.removeItem("loginUser");
        location.href = "/html/login.html";
    },
    clickHandler(event) {
        $(event.target).addClass("active").siblings("a").removeClass("active");
        $(event.target).css({
            "background-color": "#92c609"
        }).siblings("a").css({
            "background-color": ""
        });
    },
    loginHandler() {
        location.href = "/html/login.html";
    },
    logoutHandler() {
        $.getJSON("/users/logout", (data) => {
            if (data.res_body.status) {
                sessionStorage.removeItem("loginUser");
                window.location.href = "/html/login.html";
            }
        })
    },
    load() {
        // 页面加载时要判断是否有用户登录过，有则显示用户信息及注销链接
        let user = sessionStorage.loginUser;
        if (user) {
            user = JSON.parse(user);
            $(".login-success")
                .removeClass("hide")
                .text(`你好，${user.username} `);
            $(".link-logout").removeClass("hide");
            $("._user").text(`${user.username}`);
            $("._welcome").text("欢迎来到超市账单管理系统!");
            // 登录按钮操作
            $(".link-login").remove();
        }
    },
    fn() {
        var time = new Date();
        var str = "";
        //    console.log(time);
        var year = time.getFullYear();
        var mon = time.getMonth() + 1;
        var day = time.getDate();
        var h = time.getHours();
        var m = time.getMinutes();
        var s = time.getSeconds();
        var week = time.getDay();
        switch (week) {
            case 0:
                week = "日";
                break;
            case 1:
                week = "一";
                break;
            case 2:
                week = "二";
                break;
            case 3:
                week = "三";
                break;
            case 4:
                week = "四";
                break;
            case 5:
                week = "五";
                break;
            case 6:
                week = "六";
                break;
        }
        str = year + "年" + mon + "月" + day + "日" + "&nbsp;" + h + ":" + m + ":" + s + "&nbsp;" + "星期" + week;
        $(".time").html(str);
    }
});
new Copy();