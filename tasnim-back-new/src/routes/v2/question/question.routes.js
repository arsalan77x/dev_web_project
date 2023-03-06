
const express = require('express')
const { authorization, role } = require('../../../auth/authorization.middleware')
const authentication = require('../../../auth/authentication.middleware')
const router = express.Router()
const { question } = require('./question.controller')

router.get('/list', question.get_list)
router.get('/one/:id', question.get_one)
router.put('/one', authentication, role('superuser'), authorization, question.create_one)
router.patch('/one/:id', authentication, role('superuser'), authorization, question.update_one)
router.delete('/one/:id', authentication, role('superuser'), authorization, question.delete_one)
router.delete('/list', authentication, role('superuser'), authorization, question.delete_list)
module.exports = router
