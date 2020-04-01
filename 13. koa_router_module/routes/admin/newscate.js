// 新闻分类的增加修改删除
var router = require('koa-router')();

router.get('/', (ctx) => {
  
  ctx.body = '新闻分类首页';
})

router.get('/add', (ctx) => {
  
  ctx.body = '增加新闻分类';
})

router.get('/edit', (ctx) => {
  
  ctx.body = '编辑新闻分类';
})

router.get('/delete', (ctx) => {
  
  ctx.body = '删除新闻分类';
})

module.exports = router.routes();