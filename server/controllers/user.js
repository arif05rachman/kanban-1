'use strict'
const { User } = require('../models')
const { compare } = require('../helpers/passwordBcrypt')
const { generateToken } = require('../helpers/jwtToken')

class Controller{
    static register(req, res, next){
        const {name, email, password} = req.body
        User.
        create({
                name,
                email,
                password
            })
        .then(data => {
            const payload = {
                    id: data.id,
                    email:data.email
                }
            const token = generateToken(payload)
            res.status(200).json({token: token})
        })
        .catch(err =>{
            next(err)
        })
    }
    
    static login(req, res, next){
        const { email, password } = req.body
        if (!email) {
            throw { status: 400, message:'Email Must Fillin'}
        } else {            
        User
        .findOne({
            where:{email:email}
        })
        .then(data =>{
            if (!data) {
                throw { status: 404, message: 'User Not Found' } 
            }else{
                if (compare(password, data.password)) {
                    const payload = {
                        id: data.id,
                        email:data.email
                    }
                    const token = generateToken(payload)
                    res.status(200).json({token: token})
                }else{
                    throw { status: 400, message: 'Invalid Email or Password'}
                }
            }
        })
        .catch(err =>{
            next(err)
        })
        }
    }
}

module.exports = Controller
