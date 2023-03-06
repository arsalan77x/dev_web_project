const express = require('express')
const { authorization, role } = require('../../../auth/authorization.middleware')
const authentication = require('../../../auth/authentication.middleware')
const router = express.Router()
const { report } = require('./report.controller')

router.get('/todayorder', authentication, role('superadmin'), authorization, report.todayorder)
router.get('/ordersum', authentication, role('superadmin'), authorization, report.orderListSum)
router.get('/ordersumproduct', authentication, role('superadmin'), authorization, report.orderListSumProduct)
router.get('/viewer', authentication, role('superadmin'), authorization, report.logQuery)

router.get('/newview', report.newView)

module.exports = router
