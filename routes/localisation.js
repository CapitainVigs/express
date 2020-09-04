
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Localisation = require('../models/localisation');

const localisationRouter = express.Router();

localisationRouter.use(bodyParser.json());



localisationRouter.route('/')
.get((req,res,next) => {
    Localisation.find({})
    .then((Localisation) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Localisation);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Localisation.create(req.body)
    .then((localisation) => {
        console.log('Localisation Created ', Localisation);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(localisation);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Localisationes');
})
.delete((req, res, next) => {
    Localisation.deleteMany({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});




localisationRouter.route('/find')
.get((req,res,next) => {
    Localisation.find({},{liblocalisation:1})
    .then((Localisation) => {
        if (Localisation != null) {
            console.log(Localisation);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Localisation);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post((req, res, next) => {
    if(req.params.id_Localisation=='login'){
    Localisation.findOne({ email: req.body.email})
    .then((user) => {
        if (user != null) {
            if(user.password==req.body.password){
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }else{
                res.statusCode = 403;
                res.setHeader('Content-Type', 'application/json');
                res.json('Access Error');
            }
           
        }else{
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          res.json('Email : '+req.body.email+' inexistant veuillez vous inscrire');
        }
    },(err) => next(err));
        }else{
    Localisation.findById(req.params.id_Localisation)
    .then((user) => {
        if (user != null) {
            user.nom=req.body.nom;
            user.prenoms=req.body.prenoms;
            user.profession=req.body.profession;
            user.pays=req.body.pays;
            user.numero=req.body.numero;
            user.ville=req.body.ville;
            user.save()
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Localisation ' + req.params.id_Localisation + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
    }
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Localisationes');
})
.delete((req, res, next) => {
    Localisation.deleteMany({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = localisationRouter;
