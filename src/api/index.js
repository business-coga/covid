const express = require('express')
const api = express.Router()

api.use('/thongtincanhan', require('./thongTinCaNhan'))
api.use('/khaibao', require('./khaiBao'))

module.exports = api