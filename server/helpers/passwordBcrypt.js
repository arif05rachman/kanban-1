const bcrypt = require('bcrypt')

const encrypt = (password) => {
  return bcrypt.hashSync(password, 10)
}

const compare = (plain, encrypted) => {
  return bcrypt.compareSync(plain, encrypted)
}


module.exports = {
  encrypt,
  compare
}