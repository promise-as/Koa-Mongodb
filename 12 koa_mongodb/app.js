var Koa = require('koa'),
  router = require('koa-router')(),
  render = require('koa-art-template'),
  path = require('path'),
  DB = require('./module/db.js'),
  bodyParser = require('koa-bodyparser');

var app = new Koa();

app.use(bodyParser());

// 配置 koa-art-template 模板引擎
render(app, {
  root: path.join(__dirname, 'views'), // 视图的位置
  extname: '.html', // 后缀名
  debug: process.env.NODE_ENV != 'production' // 是否开启调试模式
});
// 显示学员信息
router.get('/', async (ctx) => {

  var result = await DB.find('user', {})

  await ctx.render('index', {
    list: result
  })
})
// 增加学员
router.get('/add', async (ctx) => {

  await ctx.render('add');
})

// 执行增加学员的操作
router.post('/doAdd', async (ctx) => {

  // 获取表单提交的数据
  // console.log(ctx.request.body); // { name: '王麻子', age: '20', sex: '女' }

  let data = await DB.insert('user', ctx.request.body);
  
  // console.log(data);

  try{
    if(data.result.ok){
      ctx.redirect('/')
    }
  }catch(err){
    console.log(err);
    return;
    ctx.redirect('/add');
  }
  
})

// 编辑学员
router.get('/edit', async (ctx) => {
  // 通过 get 传过来的 id 来获取用户信息

  let id = ctx.query.id;

  let data = await DB.find('user', {"_id": DB.getObjectId(id)});

  console.log(data);
  
  // 获取用户信息
  await ctx.render('edit', {
    list: data[0]
  })
})

router.post('/doEdit', async (ctx) => {
  // 通过 get 传过来的 id 来获取用户信息
  console.log(ctx.request.body);
  
  // let data = DB.update('user', {}, {})

  var id = ctx.request.body.id;
  var username = ctx.request.body.username;
  var age = ctx.request.body.age;
  var sex = ctx.request.body.sex;

  let data = await DB.update('user', {'_id': DB.getObjectId(id)}, {
    username,
    age,
    sex
  })

  try{
    if(data.result.ok){
      ctx.redirect('/')
    }
  }catch(err){
    console.log(err);
    return;
    ctx.redirect('/add');
  }

  console.log(data);
  
})

// 删除学员
router.get('/delete', async (ctx) => {

  var id = ctx.query.id;

  let data = await DB.remove('user', {'_id': DB.getObjectId(id)});

  console.log(data);

  if(data){
    ctx.redirect('/')
  }
})

app.use(router.routes()); // 启动路由
app.use(router.allowedMethods()); // 错误信息

app.listen(3000, () => {
  console.log('stating at port 3000');
})