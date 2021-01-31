const express = require('express')
const api = express.Router()


api.use('/user', require('./user'))
api.use('/schedule', require('./schedule'))
api.use('/thongtincanhan', require('./thongTinCaNhan'))
api.use('/khaibao', require('./khaiBao'))

module.exports = api