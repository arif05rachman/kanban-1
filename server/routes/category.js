'use strict'
const express = require('express')
const router = express.Router();
const Controller = require('../controllers/category')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', Controller.findAll)
// router.get('/:id', Controller.findOne)
// router.post('/', Controller.create)
// router.patch('/:id', Controller.updatePatch)
// router.put('/:id', Controller.update)
// router.delete('/:id', Controller.destroy)

module.exports = router