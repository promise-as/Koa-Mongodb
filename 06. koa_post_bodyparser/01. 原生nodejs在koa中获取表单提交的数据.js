var Koa = require('koa'),
  router = require('koa-router')(),
  views = require('koa-views'),
  common = require('./module/common.js')

var app = new Koa();

// 应用 ejs 模板引擎
app.use(views('views', {
  extension: 'ejs'
}))

router.get('/', async (ctx) => {
  await ctx.render('index')
})

// 接收 post 提交的数据
router.post('/doAdd', async (ctx) => {
  // 原生 node.js 在 koa 中获取表单提交的数据
  var data = await common.getPostData(ctx);

  console.log(data);
  ctx.body = data;
})

app.use(router.routes()); // 启动路由
app.use(router.allowedMethods()); // 错误信息

app.listen(3000, () => {
  console.log('stating at port 3000');
})