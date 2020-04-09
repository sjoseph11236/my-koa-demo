const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const static = require('koa-static');

//Intialize app. 
const app = new Koa();
const PORT = 3000; 


//Sub-route folders
const apiRouter = require('./api');

// Logger Middleware
app.use(logger());

// Custom Logger Middleware
app.use(async(ctx, next) =>  { 
  let start = new Date();
  await next();
  let end  = new Date();
  console.log('TOTAL RESPONSE TIME', end - start);
  console.log('Message of State', ctx.state.message);
});


// Body Parser Middleware
app.use(bodyParser());

// Error Middleware
app.use(async (ctx, next) => {
  try {
    console.log('here at Error handler')
    await next();
  } catch (err) {
    console.log('Recieved error...')
    ctx.throw(err.status || 500, err.message || 'Internal Server Error');
  }
});


// app.use(async (ctx, next) => { 
//   ctx.state.message = await message();
//   ctx.body = ctx.state.message;
//   next();
// })

// const message = async () => {
//   return 'Hello World';
// }


// Static middlware
app.use(static('./public'));

// // Router Middleware
app.use(apiRouter.routes())

// // // Start the app..
app.listen(PORT, ()=> console.log(`Server is listening on PORT ${PORT}`));