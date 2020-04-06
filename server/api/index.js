const { User } = require('../db');
const Router = require('koa-router');
const router = new Router({
  prefix: '/api/users'
})

router.get('/', async(ctx, next) => {
  const users = await User.findAll();
  ctx.body = users;
  next();
});

router.post('/', async (ctx, next) => { 
  const user = await User.create(ctx.request.body);
  ctx.body = user;
  next();
})

router.put('/:id', async (ctx,next) => { 
  const id = ctx.params.id;
  const body = ctx.request.body;
  const user = await User.update(body, { where : { id }});
  ctx.body = user;
  next();
})


router.delete('/:id', async (ctx, next) => { 
  const id = ctx.params.id;
  const user = await User.destroy({ where: { id }});
  ctx.body = { };
  next();
});
module.exports = router;