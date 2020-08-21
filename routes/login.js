
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Users = require('../models/users');

const loginRouter = express.Router();

loginRouter.use(bodyParser.json());




loginRouter.route('/')
.get((req,res,next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /Login');
})
.post((req, res, next) => {
    Users.findOne({ email: req.body.email})
    .then((user) => {
        if (user != null) {
            res.statusCode = 403;
                res.setHeader('Content-Type', 'application/json');
                res.json('User deja creer ');
        }else{
            Users.create(req.body)
            .then((dish) => {
            console.log('User Created ', dish);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
        }
    },(err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /login');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('Delete operation not supported on /Login');
});



module.exports = loginRouter;
