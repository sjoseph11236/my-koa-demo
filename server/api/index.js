const { User } = require('../db');
const Router = require('koa-router');
const router = new Router({
  prefix: '/api/users'
})

router.param('id', async(id, ctx, next) =>  { 
  ctx.state.user = await User.findByPk(id);
  console.log('here')
  await next();
  console.log('here too')
});

router.get('/', async(ctx, next) => { 
  const users = await User.findAll();
  ctx.body = users;
});

router.post('/', async(ctx, next) => { 
  const user = await User.create(ctx.request.body);
  ctx.body = user;
});

router.put('/:id', async(ctx, next) => { 
  // const id  = ctx.params.id;
  // const body = ctx.request.body;
  // const user = await User.update(body, { where: { id }});
  // ctx.body = user;

  const user = ctx.state.user;
  const body = ctx.request.body;
  const updatedUser =  await user.update(body);
  ctx.body = updatedUser;
});


router.delete('/:id', async(ctx, next)=> {
  const user = ctx.state.user;
  await user.destroy();
  ctx.body = {};
});

module.exports = router; 