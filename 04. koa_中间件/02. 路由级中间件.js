var Koa = require('koa');
var router = require('koa-router')();
var app = new Koa();

// Koa 中间件
// app.use(async (ctx) => {
//   ctx.body = '这是一个中间件'
// })

// 匹配任何路由，如果不写 next，这个路由匹配到了就不会继续向下匹配
router.get('/', async (ctx) => {
  ctx.body = '首页';
})
// 匹配到 news 路由以后继续向下匹配路由
router.get('/news', async (ctx, next) => {
  console.log('这是一个新闻1');
  
  await next();
})
router.get('/news', async (ctx) => {
  ctx.body = '这是一个新闻'
})


app.use(router.routes()); // 启动路由
app.use(router.allowedMethods());
app.listen(3000, () => {
  console.log('stating at port 3000');
})