
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require("../config/auth.config");
const Users = require('../models/users');
const loginRouter = express.Router();

loginRouter.use(bodyParser.json());

var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');



loginRouter.route('/')
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /Login');
    })
    .post((req, res, next) => {
        Users.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({ message: "Utilisateur non trouvé." });
                  }
        
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
        
                if (!passwordIsValid) {
                    return res.status(401).send({
                        message: "Mot de passe incorrect!"
                    });
                }
        
                let userConnect = {
                    "_id": user._id,
                    "name": user.name,
                    "email": user.email,
                    "nom": user.nom,
                    "numero": user.numero,
                    "pays": user.pays,
                    "prenoms": user.prenoms,
                    "ville": user.ville,
                    "profession": user.profession
                }
                var token = jwt.sign({ userConnect: userConnect }, config.secret, {
                    expiresIn: 86400 // 24 hours
                });
        
                res.status(200).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    nom: user.nom,
                    prenoms: user.prenoms,
                    profession: user.profession,
                    ville: user.ville,
                    numero: user.numero,
                    pays: user.pays,
                    accessToken: token,
                    trajet_actif_id:user.trajet_actif_id
                });

               

            })
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
