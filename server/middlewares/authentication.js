module.exports = (req, res, next) =>{
  const { verifyToken } = require('../helpers/jwtToken')
  const { User } = require('../models')
  
  if (!req.headers.token) {
    throw {status: 400, message: "token required"}
  } else {
    try {
      const userToken = verifyToken(req.headers.token)
      User
      .findOne({
          where:{
              id: userToken.id
          }
      })
      .then(data =>{
        if (data) {
          req.user = userToken.id
          next()
        } else {
            throw {status: 401, message: 'User Not Valid'}
          }
      })
      .catch(err => {
        next(err)
      })
    } catch (error) {
      console.log(error)
        next(error)
    }
  }
}