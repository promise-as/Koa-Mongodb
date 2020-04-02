// 引入 koa 模块
var Koa = require('koa'),
  router = require('koa-router')(),
  render = require('koa-art-template'),
  path = require('path'),
  static = require('koa-static')

// 实例化
var app = new Koa();

// 配置模板引擎
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

// 配置静态资源中间件
app.use(static(__dirname + '/public'));

// 引入模块
var index = require('./routes/index.js');
var api = require('./routes/api.js');
var admin = require('./routes/admin.js');

router.use('/admin', admin);
router.use('/api', api);
router.use(index);




router.get('/', async (ctx) => {

  ctx.body = '首页';
})

router.get('/news', async (ctx) => {

  ctx.body = '新闻列表页面';
})

app.use(router.routes());   // 启动路由
app.use(router.allowedMethods());

app.listen(3000);