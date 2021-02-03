require('dotenv').config()
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
  res.send('Server QLRR')
})
 
app.use('/api',api)

app.listen(8081, ()=>{
  console.log('Server on : http://127.0.0.1:8081')
})