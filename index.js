const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const api = require('./src/api')

app.use(morgan('dev'))

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.use('/api',api)

app.listen(3000, ()=>{
  console.log('Server on Port 3000')
})