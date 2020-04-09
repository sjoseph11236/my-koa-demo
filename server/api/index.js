const { User } = require('../db');
const Router = require('koa-router');
const router =  new Router({ 
  prefix: '/api/users'
});


router.param('id', async(id, ctx, next) => {
  console.log('here')
  ctx.state.user = await User.findByPk(id);
  await next();
  console.log('here again')
})

router.get('/', async (ctx, next )=> { 
  const users = await User.findAll();
  ctx.body = users; 
})


router.post('/', async (ctx, next) => { 
    const user = await User.create(ctx.request.body);
    ctx.body = user; 
});

router.put('/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const body = ctx.request.body;
  const user = await User.update(body, { where:{ id }});
  ctx.body = user;


  console.log("STATE", ctx.state.user)

  // const user = ctx.state.user;
  // const body = ctx.request.body;
  // const updatedUser = await user.update(body);

  // ctx.body = updatedUser;
});


router.delete('/:id', async (ctx, next) => { 
  const id = ctx.params.id;
  const user = await User.destroy({where: { id }});
  ctx.body = {};
});

/* IF NEEDED */

// let users = [
//   {
//     "name": "Sayeed",
//     "email": "sayeed@email.com"
//   },
//   {
//     "name": "Samantha",
//     "email": "Samantha@email.com"
//   }
// ]


// router.get('/', async(ctx, next) => { 
//   ctx.body = users;
// });

// router.post('/', async(ctx, next) => { 
//   const user = ctx.request.body
//   users.push(user);
//   ctx.body = user;
// });

// router.put('/:id', async(ctx, next) => { 
//   const id = ctx.params.id;
//   const body = ctx.request.body;
//   users = users.map( (user, idx) => {
//     if(idx + 1 == id) {
//       user = {...user,...body };
//     }
//     return user;
//   });

//   ctx.body = users;
// });

// router.delete('/:id', async(ctx, next) => { 
//   const id = ctx.params.id;
//   users = users.filter( (user, idx) => {
//     if((idx + 1) !== id) { 
//       return user;
//     }
//   })
//   ctx.body = {};
// });


module.exports = router;