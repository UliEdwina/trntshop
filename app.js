
let express = require('express');
let path = require('path');
console.log('works here')
let cookieParser = require('cookie-parser');
let logger = require('morgan');


let mongoose = require('mongoose');
let session = require('express-session');
// let validator = require('validator')
// let chalk = require('chalk')
// let yargs = require('yargs')
// console.log(process.argv)
// console.log(yargs.argv)
// yargs.version('1.1.0')

// // //create add
// // yargs.command({
// //     command: 'add',
// //     describe: 'new oddity',
// //     handler : function () {
// //         console.log('new bote')
// //     }

// // })

// // //create
// // yargs.command({
// //     command: 'remove',
// //     describe: 'new oddity',
// //     handler : function () {
// //         console.log('remving')
// //     }

// // })

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let MongoStore = require('connect-mongo')(session);
let app = express();


// // // view engine setup
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');

app.use(logger('dev'));
console.log('works here')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
console.log('works here');
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

require('dotenv').config();



mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true } )
        .then( () => {
          console.log('MONGODB CONNECTED')
        })
        .catch( err => console.log(`ERROR: ${err}`))

        app.use(session({
            resave: true,
            saveUninitialized: true,
            secret: process.env.SESSION_SECRET,
            store: new MongoStore({ url: process.env.MONGODB_URI, autoReconnect: true}),
            cookie: {
                secure: false, 
                maxAge: 365 * 24 * 60 * 60 * 1000
            }
        }))

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


module.exports = app;
