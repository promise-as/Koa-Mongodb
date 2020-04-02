var router = require('koa-router')();

// 引入模块
var login = require('./admin/login.js');
var user = require('./admin/user.js');

// 配置中间件 获取 url 的地址
router.use(async(ctx, next) => {
  // console.log(ctx.request.header.host);
  
  // 模板引擎配置全局的变量
  ctx.state.__HOST__ = 'http://' + ctx.request.header.host;

  await next();
})


router.get('/', async(ctx) => {

  ctx.body = '后台管理';
})

router.use('/login', login);
router.use('/user', user);

module.exports = router.routes();