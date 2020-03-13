'use strict'
const { Category, Task } = require('../models')

class Controller {
  static findAll(req, res, next) {
    const id = req.user
    Category
      .findAll({
        include: [{
          model: Task,
          where: {
            UserId: id
          },
          required: false
      }]
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static create(req, res, next) {
    const {
      title,
      CategoryId
    } = req.body
    Category
      .create({
        title,
        CategoryId
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static update(req, res, next) {
    const {
      title,
      CategoryId
    } = req.body
    const {
      id
    } = req.params
    Category
      .update({
        title,
        CategoryId
      }, {
        where: {
          id: id
        },
        returning: true
      })
      .then(data => {
        console.log(data)
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static destroy(req, res, next) {
    const {
      id
    } = req.params
    const CategoryDestroy = Category.destroy({
      id: id
    })
    const CategoryFindOne = Category.destroy({
      id: id
    })
    Promise.all([CategoryDestroy, CategoryFindOne])
      .then(data => {
        console.log(data)
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
  
}

module.exports = Controller