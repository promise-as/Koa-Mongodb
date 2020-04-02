var Koa = require('koa'),
  router = require('koa-router')(),
  render = require('koa-art-template');
  path = require('path');

// 引入子模块
var admin = require('./routes/admin.js');
var api = require('./routes/api.js');
var index = require('./routes/index.js');

const app = new Koa();
// 配置 koa-art-template 模块引擎
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

// 配置路由
router.use('/', index);

/*
  /admin 配置子路由( 层级路由 )
  /admin/user
*/
router.use('/admin', admin);

/*
  /api/newlist 新闻列表的 api
*/
router.use('/api', api);

// 启动路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('starting at port 3000');
});