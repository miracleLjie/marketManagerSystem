// 重置
$(".btn-reset").on("click",function(){
    $("#inputEmail3").val("");
    $("#inputPassword3").val("");
});
// 登录
$(".btn-login").on("click", function(){
    // 待传递到服务器的用户登录数据
    var data = $(".login-form").serialize();
    // ajax提交登录处理
    $.post("/users/login", data, (resData)=>{
        console.log(resData);
        if (resData.res_code === 1) { // 登录成功
            location.href="/"
            // 将登录成功的用户信息保存起来，保存到 sessionStorage 中
            sessionStorage.loginUser = JSON.stringify(resData.res_body);
        } else {
            // $(".login-err").removeClass("hide");
        }
    })
});