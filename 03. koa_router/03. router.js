var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa;
var router = new Router;

router.get('/', async (ctx) => {
  ctx.body = '新闻列表页面'
})

// 动态路由
router.get('/newscontent/:aid', async (ctx) => {
  // 获取动态路由的传值
  console.log(ctx.params);
  ctx.body = '新闻详情';
})

app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('stating at port 3000');
})