/*
ejs模板引擎的使用：
  1. cnpm install koa-views --save
  2. cnpm install ejs --save
  3. var views = require('koa-views');
  4. app.vue(views(__dirname, {extension: 'ejs'}));
  5. await cix.render('index');


注意：我们需要在每一个路由的 render 里面都要渲染一个公共的数据

  公共的数据放在这个里面，这样的话在模板的任何地方都可以使用

  ctx.state = { // 放在中间件
    session: this.session,
    title: 'app'
  };
*/
var Koa = require('koa'),
  router = require('koa-router')(),
  views = require('koa-views');

var app = new Koa();

// 配置模板引擎中间件 --第三方中间件
// app.use(views('views', {
//   map: {
//     html: 'ejs' // 加载以文件后缀名为.html
//   }
// }))
app.use(views('views', {
  extension: 'ejs' // 应用 ejs 模板引擎 加载以文件后缀名为.ejs
}))

// 写一个中间件配置公共的信息
app.use(async (ctx, next) => {
  ctx.state.userinfo = '张三';

  await next();
})

router.get('/', async (ctx) => {
  let title = '你好ejs';
  await ctx.render('index', {
    title
  });
})
router.get('/news', async (ctx) => {
  // ctx.body = '这是一个新闻';
  let arr = ['111', '222', '333'];

  let content = '<h2>这是一个h2</h2>';

  let num = 123;
  await ctx.render('news', {
    list: arr,
    content,
    num
  })
})

app.use(router.routes()); // 启动路由
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('stating at port 3000');
})
