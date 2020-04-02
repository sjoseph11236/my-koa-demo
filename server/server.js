const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const static = require('koa-static');
// const send = require('koa-send');
const passport = require('koa-passport');
const session = require('koa-generic-session')
const { db } = require('./db/');
const User = require('./db/models/User');
const SequelizeStore = require('koa-generic-session-sequelize');
const dbStore = new SequelizeStore({ db });

dbStore.sync();

//Intialize app.  
const app =  new Koa();
const PORT = 3000; 


//Sub-route folders
const apiRouter = require('./api');
const authRouter = require('./auth');

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// sessions
app.keys = [ process.env.SESSION_SECRET || 'a wildly insecure secret' ];
app.use(session({
  store: dbStore, 
}));



app.use(passport.initialize());
app.use(passport.session());


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


// app.use(async (ctx) => {
//   await send(ctx, ctx.path, { root: __dirname + '/public/index.html ' });
// }) 

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