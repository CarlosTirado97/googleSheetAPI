const express = require('express')
const app = express();
const bodyparser = require('body-parser')

app.set('views', './src/views')
app.set('view engine','pug')

//middleware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

//routes
app.use(require('./routes/google.routes'));

//handlers

app.on('UnhandledPromiseRejection', (err) => {
    console.log(err)
})


module.exports = app;