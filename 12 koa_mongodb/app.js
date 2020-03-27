/*
koa-static 静态资源中间件 静态 web 服务
  1. cnpm install koa-static --save
  2. const static = require('koa-static')
  3. 配置中间件

  app.use(static('static'))
*/
var Koa = require('koa'),
  router = require('koa-router')(),
  views = require('koa-views'),
  bodyParser = require('koa-bodyparser'),
  static = require('koa-static')

var app = new Koa();

// 应用 ejs 模板引擎
app.use(views('views', {
  extension: 'ejs'
}))

// 配置静态 web 服务的中间件
// app.use(static('/static'))

app.use(static(__dirname + '/static'))

app.use(static(__dirname + '/public'))

// 配置 post bodyparser 的中间件
app.use(bodyParser());

router.get('/', async (ctx) => {
  await ctx.render('index')
})

// 接收 post 提交的数据
router.post('/doAdd', async (ctx) => {
  console.log(ctx.request.body);
  
  ctx.body = ctx.request.body;
})

app.use(router.routes()); // 启动路由
app.use(router.allowedMethods()); // 错误信息

app.listen(3000, () => {
  console.log('stating at port 3000');
})