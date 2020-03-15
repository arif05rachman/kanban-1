module.exports = (req, res, next) =>{
  const { Task } = require('../models')
  
    Task
      .findOne({
          where:{
              id: req.params.id
          }
      })
      .then(data => {        
        if (!data) {   
          throw {status: 404, message: 'Data Not Found'}
        } else {
          
          if (data.UserId === req.user) {
            next()
          } else {
          throw {status: 401, message: 'Unauthorize'}
          }
        }
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
}