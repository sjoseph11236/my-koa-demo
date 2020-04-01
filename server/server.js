const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const static = require('koa-static');
const send = require('koa-send');


//Intialize app.  
const app =  new Koa();
const router = new KoaRouter();

const PORT = 3000; 

// Logger Middleware
app.use(logger());
// JSON Prettier Middleware
app.use(json());
// Body Parser Middleware
app.use(bodyParser());
// Static middlware

app.use(static('./public'));
// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

// app.use(async (ctx) => {
//   await send(ctx, ctx.path, { root: __dirname + '/public/index.html ' });
// }) 

// 
app.use(async (ctx, next) => {
  try {
    ctx.body = 'Hello World!'
    await next();
  } catch (error) {
    console.log('Passing error to error middlware...')
    next(error)
  }
});







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

// Start the app..
app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));