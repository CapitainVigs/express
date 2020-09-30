
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
    Users.create(
        {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            nom: req.body.nom,
            prenoms: req.body.prenoms,
            profession: req.body.profession,
            ville: req.body.ville,
            numero: req.body.numero,
            pays: req.body.pays,

        }
    )
        .then((dish) => {
            console.log('User Created ', dish);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})



module.exports = userRouter;
