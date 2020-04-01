const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});

router.get('/', async ctx => ctx.body = "Hello from api route")

module.exports = router;