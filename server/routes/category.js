'use strict'
const express = require('express')
const router = express.Router();
const Controller = require('../controllers/category')

router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)
router.post('/', Controller.create)
router.patch('/:id', Controller.updatePatch)
router.put('/:id', Controller.updatePut)
router.delete('/:id', Controller.destroy)

module.exports = router