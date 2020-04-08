
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
<<<<<<< HEAD
app.use(json());
// Body Parser Middleware
app.use(bodyParser());
// // Static middlware
app.use(static('./public'));


// Express Static Middlleware
// app.use(express.static('public'))


=======
>>>>>>> 72ce8238c93a0e07c5d1ca9bfc9bda56f8371a00



// // Router Middleware
app.use(apiRouter.routes())


<<<<<<< HEAD
// // Starter hello world
// Cascading example
=======



// Body Parser Middleware

// // Router Middleware




// // Starter hello world 

// *** Cascading example ***

>>>>>>> 72ce8238c93a0e07c5d1ca9bfc9bda56f8371a00
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

// Express Error Middleware
// app.use((error,req, res, next) => { 
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })


<<<<<<< HEAD
=======

// Static middlware

>>>>>>> 72ce8238c93a0e07c5d1ca9bfc9bda56f8371a00




// Error Middleware

// Express Error Middleware
// app.use((error,req, res, next) => { 
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })





// // // Start the app..

