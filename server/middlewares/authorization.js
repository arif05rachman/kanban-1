module.exports = (req, res, next) =>{
  const { Task } = require('../models')
  
  try {
    Task
      .findOne({
          where:{
              UserId: req.user
          }
      })
      .then(data =>{
        if (!data) {
          throw {status: 401, message: 'Unauthorize'}
        } else {
          next()
        }
      })
      .catch(err => {
        next(err)
      })
    } catch (error) {
        next(error)
  }
}