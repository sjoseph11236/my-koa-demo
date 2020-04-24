const Koa = require('koa');

// Create app
const app = new Koa();
const PORT = 3000; 


const logger = require('koa-logger');
const static = require('koa-static');
const Router = require('Koa-router');
const bodyParser = require('koa-bodyparser');

// Koa-Logger
app.use(logger());

// Custom logger middlware
app.use(async (ctx, next)=> {
  let start = new Date();
  console.log('Line 16 ---> Going to next function..')
  await next();
  // ctx.body = 'Not Hello world';
  // next();
  console.log('Line 19 ---> continuing on in this function...')
  let end = new Date();
  console.log("Line 20 ---> Total is ...", end - start)
  console.log('Line 21 ---> Message on state', ctx.state.message);
  console.log('Line 22 ---> body', ctx.body);
  // Change the message on the response body which is what will be sent out automatically 
  // as the response since the flow ends here.
  ctx.body = 'Not Hello world';
  console.log('Line 32 ---> body ------->', ctx.body);  
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


// Message Middleware
app.use(async (ctx, next) => { 
  console.log('Line 46 ---> here in next function');
  // message function on line 50 returns a promise of the message "Hello World"
  ctx.state.message = await message();
  console.log('Line 49 ---> message', ctx.state.message);
  // add the message to the response body. 
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
