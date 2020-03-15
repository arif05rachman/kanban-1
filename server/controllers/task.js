'use strict'
const { Task, Category } = require('../models')

class Controller{
  static findAll(req, res, next) {
    const id = req.user
    Task
      .findAll({
        where: {
          UserId: id
        }
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
  
  static create(req, res, next) {
    const { title, CategoryId } = req.body
    const id = req.user
    Task
      .create({
        title,
        CategoryId,
        UserId: id
      })
      .then(data => {
        req.io.emit('reloadTask')
        res.status(201).json(data)
      })
      .catch(err => {
        console.log(err)
        next(err)
    })
  }

  static update(req, res, next) {
    const {title, CategoryId} = req.body
    const {id} = req.params
    Task
      .update({
        title,
        CategoryId
      },
        {
        where: {
          id: id
          },
          returning: true
      })
      .then(data => {
        req.io.emit('reloadTask')
        console.log(data)
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static destroy(req, res, next) {
    const { id } = req.params
      Task.destroy({
        where: {
          id: id
        }
      })
        .then(data => {
        req.io.emit('reloadTask')
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