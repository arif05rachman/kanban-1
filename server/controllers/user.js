'use strict'
const { User } = require('../models')
const { compare } = require('../helpers/passwordBcrypt')
const { generateToken } = require('../helpers/jwtToken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT);


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
            res.status(200).json({name: data.name, token: token})
        })
        .catch(err =>{
            next(err)
        })
    }
    
    static login(req, res, next) {
        const {email, password} = req.body
        if (!email) {
            throw { status: 400, message:'Email Must Fillin'}
        } else if (!password) {
            throw { status: 400, message:'Password Must Fillin'}
        } 
        else {            
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
                    res.status(200).json({name: data.name, token: token})
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
    static loginGoogle(req, res, next) {
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.GOOGLE_CLIENT, // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            console.log(payload.email);
            User
                .findOne({
                    where: {
                        email: payload.email
                    }
                })
                .then(result => {
                    if (result) {
                        const payloadToken = {
                            id: result.id,
                            email: result.email
                        }
                        console.log(result.email)
                        const token = generateToken(payloadToken)
                        res.status(200).json({
                            token,
                            name: result.name
                        })
                    } else {
                        let passGen = String(Math.floor(Math.random() * 100000))
                        // sendMail(payload, passGen)
                        User
                            .create({
                                email: payload.email,
                                password: passGen,
                                name: payload.name
                            })
                            .then(result => {
                                const payload = {
                                    id: result.id,
                                    email: result.email,
                                }
                                const token = generateToken(payload)
                                res.status(201).json({
                                    token,
                                    name: result.name
                                })
                            })
                    }
                })
            // If request specified a G Suite domain:
            //const domain = payload['hd'];
        }
        verify().catch(console.error);
    }
}

module.exports = Controller
