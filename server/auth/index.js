const Router = require('koa-router')
const router = Router({
  prefix: '/auth'
});

router.get('/', async ctx => ctx.body = "Hello from the auth route.")

module.exports = router;