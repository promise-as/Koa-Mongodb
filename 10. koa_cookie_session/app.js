/*
1. cnpm install koa-session --save

2. const session = require('koa-session');

3. app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true, 
  httpOnly: true,
  signed: true, 
  rolling: false, 
  renew: false, 
};

*/

var Koa = require('koa'),
  router = require('koa-router')(),
  render = require('koa-art-template'),
  path = require('path'),
  session = require('koa-session')

var app = new Koa();

// 配置 koa-art-template 模板引擎
render(app, {
  root: path.join(__dirname, 'views'), // 视图的位置
  extname: '.html', // 后缀名
  debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
});
// 配置 session 的中间件
app.keys = ['some secret hurr']; // cookie 的签名
const CONFIG = {
  key: 'koa:sess',  // 默认
  maxAge: 86400000, // cookie 的过期时间 需要设置
  overwrite: true,  // boolean) can overwrite or not (default true) 没有效果 默认
  httpOnly: true,   // true 表示只有服务器端可以获取 cookie
  signed: true,     // 默认 签名
  rolling: false,   // 在每次请求时设置 cookie，这将重置 cookie 过期时间（默认：false）
  renew: false,     // (boolean) renew session when session is nearly expired 需要修改
};
app.use(session(CONFIG, app));

router.get('/', async (ctx) => {

  // koa 中没法直接设置中文的 cookie

  var userinfo = new Buffer('张三').toString('base64');

  ctx.cookies.set('userinfo', userinfo, {
    maxAge: 60 * 1000 * 60
  })

  let list = {
    name: '张三'
  }

  await ctx.render('index', {
    list: list
  })
})

router.get('/news', async (ctx) => {

  var data = ctx.cookies.get('userinfo');
  var userinfo = new Buffer(data, 'base64').toString();

  console.log(userinfo);

  let app = {
    name: '张三11'
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