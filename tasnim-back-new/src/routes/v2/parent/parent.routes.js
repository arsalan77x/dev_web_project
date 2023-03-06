
const express = require('express')
const { authorization, role } = require('../../../auth/authorization.middleware')
const authentication = require('../../../auth/authentication.middleware')
const router = express.Router()
const { parent } = require('./parent.controller')


router.post('/upload', parent.upload_image)

module.exports = router
