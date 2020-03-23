var Koa = require('koa');
var router = require('koa-router')();
var app = new Koa();

// Koa 中间件
// app.use(async (ctx) => {
//   ctx.body = '这是一个中间件'
// })

// 匹配任何路由，如果不写 next，这个路由匹配到了就不会继续向下匹配
app.use(async (ctx, next) => {
  console.log('1. 这是一个中间件01');
  await next();

  console.log('5. 匹配路由完成以后又会返回来执行中间件');
})
app.use(async (ctx, next) => {
  console.log('2. 这是第二个中间件02');
  await next();

  console.log('4. 匹配路由完成以后又会返回来执行中间件');
})

router.get('/', async (ctx) => {
  ctx.body = '首页';
})
// 匹配到 news 路由以后继续向下匹配路由
router.get('/news', async (ctx) => {
  console.log('3. 匹配到了 news 这个路由');
  ctx.body = '这是一个新闻';
})
router.get('/newslist', async (ctx) => {
  ctx.body = '新闻列表页面'
})



app.use(router.routes()); // 启动路由
app.use(router.allowedMethods());
app.listen(3000, () => {
  console.log('stating at port 3000');
})