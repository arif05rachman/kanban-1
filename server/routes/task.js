'use strict'
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/task');

router.get('/', Controller.findAll);
router.post('/', Controller.crreate);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.destroy);

module.exports = router