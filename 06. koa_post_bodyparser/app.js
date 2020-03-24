var Koa = require('koa');
var Router = require('koa-router');
var views = require('koa-views');

var app = new Koa();

var router = new Router();

// 应用 ejs 模板引擎
app.use(views('views'), {
  extension: 'ejs'
})

router.get('/', (ctx) => {
  ctx.body = '首页'
})

router.get('/news', (ctx) => {
  ctx.body = '新闻'
})

app.use(router.routes()); // 启动路由
app.use(router.allowedMethods); // 错误信息

app.listen(3000, () => {
  console.log('stating at port 3000');
})