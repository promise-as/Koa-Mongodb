var router = require('koa-router')();

// 引入模块
var login = require('./admin/login.js');
var user = require('./admin/user.js');

// 配置中间件 获取 url 的地址
router.use(async (ctx, next) => {
  // console.log(ctx.request.header.host);

  // 模板引擎配置全局的变量
  ctx.state.__HOST__ = 'http://' + ctx.request.header.host;
  // console.log(ctx.url); // /admin/user

  // console.log(ctx.session.userinfo);
  

  // 权限判断
  if (ctx.session.userinfo) {

    await next();

  } else { // 没有登录跳转到登录页面

    if (ctx.url == '/admin/login' || ctx.url == '/admin/login/doLogin') {

      await next();
      
    } else {

      ctx.redirect('/admin/login')
      
    }

  }

})


router.get('/', async (ctx) => {

  ctx.render('admin/index')
})

router.use('/login', login);
router.use('/user', user);

module.exports = router.routes();