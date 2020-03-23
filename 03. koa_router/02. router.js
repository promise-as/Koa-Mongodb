// 引入 Koa 模块
var Koa = require('koa');
var Router = require('koa-router');

// 实例化
var app = new Koa();
var router = new Router();

// 配置路由
router.get('/', async (ctx) => {
  ctx.body = '首页';
})
router.get('/news', async(ctx) => {
  ctx.body = '这是一个新闻页面'
})
router.get('/newscontent', async(ctx) => {
  // 从 ctx 中读取 get 值
  console.log(ctx.query); // {aid: '123'} 获取的是对象 用的最多的方式
  console.log(ctx.querystring); // aid=123&name=%E5%BC%A0%E4%B8%89 获取的是一个字符串
})

app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('stating at port 3000');
})
