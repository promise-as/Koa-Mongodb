// 用户的增加修改删除
var router = require('koa-router')();

router.get('/',async (ctx) => {

  await ctx.render('admin/user/index');
})

router.get('/add', async (ctx) => {

  // ctx.body = '增加用户';

  await ctx.render('admin/user/add');
})

router.get('/edit', async (ctx) => {

  // ctx.body = '编辑用户';

  await ctx.render('admin/user/edit');
})

router.get('/delete', async (ctx) => {

  ctx.body = '删除用户';
})

module.exports = router.routes();