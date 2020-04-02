const { User } = require('../db/');
const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});

router.get('/', async (ctx, next )=> { 
  try {
    const user = await User.findAll();
    ctx.body = user; 
  } catch (error) {
    next(error)
  }
})


router.post('/', async (ctx, next) => { 
  try {
    const user = await User.create(ctx.request.body);
    ctx.body = user; 
  } catch (error) {
    next(error)
  }
});

router.put('/:id', async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const body = ctx.request.body;
    const user = await User.update(body, { where:{ id }});
    ctx.body = user;
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', async (ctx, next) => { 
  try {
    const id = ctx.params.id;
    const user = await User.destroy({where: { id }});
    ctx.body = {};
  } catch (error) {
    next(error);
  }
});

module.exports = router;