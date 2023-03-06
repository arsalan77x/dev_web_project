const express = require('express')
const authentication = require('../../../auth/authentication.middleware')
const {authorization, role} = require('../../../auth/authorization.middleware')
const router = express.Router()
const {config} = require('./config.controller')

router.get('/list', authentication, role('superadmin'), authorization, config.get_list)
router.get('/one', authentication, role('superadmin'), authorization, config.get_one)
router.patch('/one', authentication, role('superadmin'), authorization, config.update_one)

module.exports = router
