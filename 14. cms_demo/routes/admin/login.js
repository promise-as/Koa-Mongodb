const router = require('koa-router')();

const tools = require('../../model/tools.js');

const DB = require('../../model/db.js');

router.get('/', async (ctx) => {

  await ctx.render('admin/login');
})


// post
router.post('/doLogin', async (ctx) => {

  console.log(ctx.request.body); // { username: 'admin', password: '123456' }

  // 首先得去数据库匹配
  let username = ctx.request.body.username;

  let password = ctx.request.body.password;

  // console.log(tools.md5(password));

  // 1. 验证用户名密码是否合法

  // 2. 去数据库匹配

  // 3. 成功以后把用户信息写入 session

  var result = await DB.find('admin', {'username': username, 'password': tools.md5(password)});

  console.log(result);
  

  // if(result.lenght > 0){
  //   // console.log('成功');
  //   console.log(result);
    
  //   ctx.session.userinfo = result[0];

  //   ctx.redirect(ctx.state.__HOST__ + '/admin')
  // }else{
  //   console.log('失败');
  // }
})

module.exports = router.routes();