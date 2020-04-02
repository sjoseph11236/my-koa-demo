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

// Static middlware
app.use(static('./public'));



// // 
// app.use(async (ctx, next) => {
//   try {
//     ctx.body = 'Hello World!'
//     await next();
//   } catch (error) {
//     console.log('Passing error to error middlware...')
//     next(error)
//   }
// });

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

db.sync({force: true})
  .then(() => {
    console.log('db synced');
    app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
  });