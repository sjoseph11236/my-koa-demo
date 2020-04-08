
const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const static = require('koa-static');

//Intialize app. 



//Sub-route folders

const apiRouter = require('./api');

// Logger Middleware

// JSON Prettier Middleware

// Error Middleware
app.use(async (next, ctx) => { 
  try {
    console.log('here at Error Middleware');
    await next()
  } catch (err) {
    console.log('Recieving error...')
    console.log(err.status)    
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
})


// // Router Middleware
app.use(apiRouter.routes())





// Body Parser Middleware

// // Router Middleware




// // Starter hello world 

// *** Cascading example ***

// app.use(async (ctx, next) => {
//   console.log('here')
//   await next();
//   console.log('finally')
// })

// app.use(async (ctx, next) => { 
//   console.log('here too');
//   ctx.body = ('Hello World');
// });

// Express Middleware
// app.use(( req, res, next) => { 
//   res.send("Hello")

// })


// Express Error Middleware
// app.use((error,req, res, next) => { 
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })



// Static middlware


// Express Static Middlleware
// app.use(express.static('public'))



// Error Middleware

// Express Error Middleware
// app.use((error,req, res, next) => { 
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })





// // // Start the app..

