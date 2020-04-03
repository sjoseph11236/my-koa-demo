const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const static = require('koa-static');
const { db } = require('./db/');

//Intialize app.  
const app =  new Koa();
const PORT = 3000; 


//Sub-route folders
const apiRouter = require('./api');
const authRouter = require('./auth');

// Logger Middleware
app.use(logger());
// JSON Prettier Middleware
app.use(json());
// Body Parser Middleware
app.use(bodyParser());


// // Router Middleware
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
app.use(authRouter.routes()).use(apiRouter.allowedMethods());




// // Starter hello world
// // Cascading example
// app.use(async (ctx, next) => {
//   console.log('here')
//   await next();
//   console.log('finally')
// })

// app.use(async (ctx, next) => { 
//   console.log('here too');
//   ctx.body = ('Hello World');
// });


// // EXPRESS Cascading example
// app.use(async (req, res, next) => {
//   console.log('here')
//   await next();
//   console.log('finally')
// })

// app.use(async (req, res, next) => { 
//   console.log('here too');
//   await next();
//   res.send('Hello World');
// });


// Static middlware
app.use(static('./public'));



// Error Middleware
app.use(async (next, ctx) => { 
  try {
    console.log('here');
    await next()
  } catch (err) {
    console.log('Recieving error...')
    console.log(err.status)    
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
})

// // Start the app..
// app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));

db.sync({force: false})
  .then(() => {
    console.log('db synced');
    app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
  });