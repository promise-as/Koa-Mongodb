/*
http://aui.github.io/art-template/
  1. 
  cnpm install --save art-template
  cnpm install --save koa-art-template

  2. const render = require('koa-art-template');

  3. 
  render(app, {
    root: path.join(__dirname, 'view'), // 视图的位置
    extname: '.art', // 后缀名
    debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
  })

  4. await ctx.render('user');
*/

var Koa = require('koa'),
  router = require('koa-router')(),
  render = require('koa-art-template'),
  path = require('path')

var app = new Koa();

// 配置 koa-art-template 模板引擎
render(app, {
  root: path.join(__dirname, 'views'), // 视图的位置
  extname: '.html', // 后缀名
  debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
})

router.get('/', async (ctx) => {
  // ctx.body = '首页'

  let list = {
    name: '张三',
    h: '<h2>这是一个 h2 </h2>',
    num: 30,
    data: ['111', '222', '333']
  }
  
  await ctx.render('index', {
    list: list
  })
})

router.get('/news', async (ctx) => {
  let app = {
    name: '张三11',
    h: '<h2>这是一个 h2 11 </h2>',
    num: 20,
    data: ['11111', '22222', '33333']
  }

  await ctx.render('news', {
    list: app
  })
})

app.use(router.routes()); // 启动路由
app.use(router.allowedMethods()); // 错误信息

app.listen(3000, () => {
  console.log('stating at port 3000');
})