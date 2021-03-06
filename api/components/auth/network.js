const express = require('express')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        let token = await controller.login(req.body.username, req.body.password)
        response.success(req, res, token, 200)
    } catch (error) {
        response.error(req, res, 'Invalid information', 400)
    }
})

module.exports = router