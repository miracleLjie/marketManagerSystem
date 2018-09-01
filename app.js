const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// 引入express-session中间件
const session = require("express-session");
// 路由中间件
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const suppliersRouter = require('./routes/suppliers.js');
const BillsRouter = require('./routes/bills.js')
// 创建express应用实例
const app = express();
// 模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 使用各中间件完成应用功能
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("lc"));
// session配置：使用express-session中间件
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'lc',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 45*60*1000 }
}));

// 判断用户是否已登录
app.use(function(req, res, next){
  // 获取请求的URL
  const {url} = req;
  // 判断
  if (url.indexOf("/html/supplier") !== -1) {
    // 获取在 session 中保存的登录用户信息
    const user = req.session.loginUser;
    if (!user) {
      // res.sendFile(path.join(__dirname, "./public/index.html"));
      res.redirect("/");
      return false;
    }
  }
  if (url.indexOf("/html/bill_manager") !== -1) {
    // 获取在 session 中保存的登录用户信息
    const user = req.session.loginUser;
    if (!user) {
      // res.sendFile(path.join(__dirname, "./public/index.html"));
      res.redirect("/");
      return false;
    }
  }
  next();
});
// 指明静态资源存放位置
app.use(express.static(path.join(__dirname, 'public')));
// 使用路由中间件
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/suppliers', suppliersRouter); // 访问positions目录下资源
app.use("/bills",BillsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
