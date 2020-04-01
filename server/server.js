const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');


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


// Error Middleware
app.use(async (next) => { 
  try {
    console.log('here');
    await next()
    console.log('here again ')
  } catch (error) {
    console.log(err.status)
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
})

// 
app.use((ctx, next) => ctx.body = "Hello World" )

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

// Start the app..
app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));