
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Users = require('../models/users');
const multer = require('../config/multer-config')
const userRouter = express.Router();
const fs = require('fs');
userRouter.use(bodyParser.json());

var bcrypt = require('bcryptjs');


userRouter.route('/')
    .get((req, res, next) => {
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
    .delete((req, res, next) => {
        Users.deleteMany({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });




userRouter.route('/:id_users')
    .get((req, res, next) => {
        Users.findById(req.params.id_users)
            .then((dish) => {
                if (dish != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);
                }
                else {
                    err = new Error('User ' + req.params.id_users + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Users.findById(req.params.id_users)
            .then((user) => {
                if (user != null) {
                    user.nom = req.body.nom;
                    user.prenoms = req.body.prenoms;
                    user.profession = req.body.profession;
                    user.pays = req.body.pays;
                    user.numero = req.body.numero;
                    user.ville = req.body.ville;
                    user.save()
                        .then((user) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(user);
                        }, (err) => next(err));
                }
                else {
                    err = new Error('User' + req.params.id_users + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        Users.findById(req.params.id_users)
            .then((user) => {
                if (user != null) {
                    user.trajet_id = req.body.trajet_id
                }
                else {
                    err = new Error('User' + req.params.id_users + ' not found');
                    err.status = 404;
                    return next(err);
                }
            })
    })
    .delete((req, res, next) => {
        Users.deleteMany({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

    


module.exports = userRouter;
