'use strict'
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/task');
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', Controller.findAll);
router.post('/', Controller.create);
router.put('/:id', authorization, Controller.update);
router.patch('/:id', authorization, Controller.update);
router.delete('/:id', authorization, Controller.destroy);

module.exports = router
