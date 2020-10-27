//load libaries
const express = require('express')
const handlebars = require('express-handlebars')
var dice1;
var dice2;
//configure the environment
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

// create an instance of express
const app = express()

// configure handlebars
app.engine('hbs', 
    handlebars({defaultLayout: 'default.hbs'})
)
app.set('view engine', 'hbs')

//configure application
app.use(
    express.static(__dirname + '/static')
)

// GET roll
app.get('/roll', 
(req, resp, next) =>{
    console.info(`the request is ${req.originalUrl}`)
    // set the status
    resp.status(200)
    resp.type('text/html')
    dice1 = Math.floor(Math.random() * 6) + 1
    dice2 =Math.floor(Math.random() * 6) + 1
    resp.sendFile(__dirname + '/static/rolled.hbs')
})

app.use((req, res, next) => {
    console.info(`${new Date()}: ${req.method} ${req.originalURL}`)
    next()
} )





// starts the server
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})