// 引入 Koa 模块
var Koa = require('koa');
var Router = require('koa-router');

// 实例化
var app = new Koa();
var router = new Router();

// ctx 上下文 context，包含了 request 和 response 等信息
// 配置路由
router.get('/', async (ctx) => {
  ctx.body = '首页'; // 返回数据 相当于：原生里面的 res.writeHead() res.end()
}).get('/news', async(ctx) => {
  ctx.body = '这是一个新闻页面'
})
app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods()) // 可以配置也可以不配置，建议配置
  // 作用：这是官方文档的推荐用法，我们可以看到 router.allowedMethods()用在了路由匹配
  // router.routes() 之后，所有在所有路由中间件最后调用。此时根据 ctx.status 设置
  // response 响应头
app.listen(3000, () => {
  console.log('stating at port 3000');
})
