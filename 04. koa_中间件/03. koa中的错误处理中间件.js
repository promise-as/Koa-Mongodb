var Koa = require('koa');
var router = require('koa-router')();
var app = new Koa();

// Koa 中间件
// app.use(async (ctx) => {
//   ctx.body = '这是一个中间件'
// })

// 匹配任何路由，如果不写 next，这个路由匹配到了就不会继续向下匹配
app.use(async (ctx, next) => {
  console.log('这是一个中间件01');
  next();

  if (ctx.status == 404) { // 如果页面找不到
    ctx.status = 404;
    ctx.body = '这是一个 404 页面'
  } else {
    console.log(ctx.url);
  }
})

router.get('/', async (ctx) => {
  ctx.body = '首页';
})
// 匹配到 news 路由以后继续向下匹配路由
router.get('/news', async (ctx) => {
  console.log('这是一个新闻2');
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