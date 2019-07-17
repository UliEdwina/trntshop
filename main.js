const app = require('./app');

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () =>{
    console.log('Express is Running on port', PORT)
})
//console.log('server:', server)