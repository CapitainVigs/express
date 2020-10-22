
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require("../config/auth.config");
const Users = require('../models/users');

const userRouter = express.Router();

userRouter.use(bodyParser.json());

var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');



userRouter.route('/')
.get((req,res,next) => {
    Users.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    console.log('Inscription en cours');
    Users.find({email:req.body.email},'_id')
            .then((user) => {
                if(user[0]!=null){
                    res.statusCode = 401;
                    console.log('Vous etes deja inscrit, veuillez vous connecter',user);
                    res.json(null);
                }else{
                    console.log('creation en cours');
                    Users.create(
                        {
                            email: req.body.email,
                            password: bcrypt.hashSync(req.body.password, 8),
                        }
                    ).then((user) => {
                            console.log('User Created ', user);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(user);
                        }, (err) => next(err))
                }
               
            }, (err) => next(err))
            .catch((err) => next(err));
   
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})



module.exports = userRouter;
