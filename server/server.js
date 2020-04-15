const Koa = require('koa');
const logger = require('koa-logger');
const static = require('koa-static');
const Router = require('Koa-router');
const bodyParser = require('koa-bodyparser');
// Create app
const app = new Koa();
const PORT = 3000; 

// Custom logger middlware
app.use(logger());

app.use(async (ctx, next)=> {
  let start = new Date();
  console.log('Going to next function..')
  await next();
  // next();
  console.log('continuing on in this function...')
  let end = new Date();
  console.log("Total is ...", end - start)
  console.log('Message on state', ctx.state.message);
});

app.use(bodyParser());
// Error Middlware
// app.use(async(ctx, next) => {
//   try {
//     console.log('here')
//     await next();
//     console.log('here too');
//   } catch (error) {
//     console.log('Recieved error...')
//     ctx.throw(error.status || 500, error.message || "Internal Server Error")
//   }
// });



app.use(async (ctx, next) => { 
  console.log('here in next function');
  ctx.state.message = await message();
  console.log('message', ctx.state.message);
  ctx.body = ctx.state.message;
});

const message = async () => { 
  return 'Hello World';
}

app.use(static('./public'));

const apiRouter = require('./api');
app.use(apiRouter.routes());
// const router = new Router();
// app.use(router.routes())
// router.get('/home', async(ctx, next) => {
//   ctx.body = ctx
//   next()
// });


// start app...
app.listen(PORT, ()=> console.log(`Server is listening on PORT: ${PORT}`));
