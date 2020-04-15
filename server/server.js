const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const static = require('koa-static');

//Intialize app. 
const app = new Koa();
const PORT = 3000; 

// Logger Middleware
app.use(logger());

// Error Middleware
app.use(async (ctx, next) => {
  try {
    console.log('here at Error handler');
    await next();
    console.log('Line 15 ----> Back Here');
  } catch (err) {
    console.log('Recieved error...')
    ctx.throw(err.status || 500, err.message || 'Internal Server Error');
  }
});

//Sub-route folders
const apiRouter = require('./api');



// Custom Logger Middleware
app.use(async(ctx, next) =>  { 
  let start = new Date();
  console.log('Going to next function..')
  await next();
  console.log('continuing on in this function')
  let end  = new Date();
  console.log('Line 22 ---> TOTAL RESPONSE TIME', end - start);
  console.log('Line 23 ---> Message of State', ctx.state.message);
});


// Body Parser Middleware
app.use(bodyParser());




app.use(async (ctx, next) => { 
  console.log('here in next function')
  ctx.state.message = await message();
  console.log('message', ctx.state.message);
  ctx.body = ctx.state.message;
  next();
})

const message = async () => {
  return 'Hello World';
}


// Static middlware
app.use(static('./public'));

// // Router Middleware
app.use(apiRouter.routes())

// // // Start the app..
app.listen(PORT, ()=> console.log(`Server is listening on PORT ${PORT}`));