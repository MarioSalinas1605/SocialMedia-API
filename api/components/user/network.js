const express = require('express')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const list = await controller.list()
        response.success(req, res, list, 200)
    } catch (error) {
        console.error(error);
        response.error(req, res, error.message, 500)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await controller.get(req.params.id)
        console.log(user);
        
        response.success(req, res, user, 200) 
    } catch (error) {
        
    }
})

module.exports = router