

router.param('id', async(id, ctx, next) => {
  console.log('here')
  ctx.state.user = await User.findByPk(id);
  await next();
  console.log('here again')
})

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


    console.log("STATE", ctx.state.user)

    // const user = ctx.state.user;
    // const body = ctx.request.body;
    // const updatedUser = await user.update(body);

    // ctx.body = updatedUser;
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