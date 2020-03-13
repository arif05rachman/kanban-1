'use strict'

module.exports = (err, req, res, next) => {
    console.log(err)
    // res.send(err)
    let message = []
    if (err.name === 'SequelizeValidationError') {
        err.errors.forEach(element => {
            message.push(element.message)
        });
        res.status(400).json({status: 400, message})
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        err.errors.forEach(element => {
            message.push(element.message)
        });
        res.status(400).json({message})
    } else if (err.name === 'SequelizeDatabaseError') {
        res.status(400).json({
            status: 400, message: 'Data Inputan salah'
        })
    } else if (err.status === 400) {
        res.status(err.status).json(err)
    } else if (err.status === 404) {
        res.status(err.status).json(err)
    } else if (err.name === 'JsonWebTokenError') {
        res.status(400).json({status: 400, message: 'Invalid Token'})
    }else if (err.status === 401) {
        res.status(401).json({status: 401, message: err.message})
    }
    else {
        res.status(500).json({status: 500, message: "Internal Server Error"})
    }
}