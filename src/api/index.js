const express = require('express')
const api = express.Router()


api.use('/user', require('./user'))
api.use('/schedule', require('./schedule'))

module.exports = api