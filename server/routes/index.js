'use strict'
const express = require('express');
const router = express.Router();
const User = require('./user');
// const Category = require('./category');
// const Task = require('./task');

router.use('/user', User)
// router.use('/categories', Category)
// router.use('/tasks', Task)

module.exports = router