var Koa = require('koa');
var router = require('koa-router')(); // 引入是实例化路由

// 实例化
var app = new Koa();

router.get('/', async (ctx) => {
  ctx.body = '首页';
})

router.get('/news', async (ctx) => {
  ctx.body = '新闻列表页面'
})

router.get('/newscontent', async (ctx) => {
  ctx.body = '新闻详情';
})

app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('stating at port 3000');
})