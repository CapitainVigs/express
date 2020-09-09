
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const reservation = require('../models/reservation');

const reservationRouter = express.Router();

reservationRouter.use(bodyParser.json());


reservationRouter.route('/')
.get((req,res,next) => {
    trajet.find({})
    .then((trajet) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(trajet);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    trajet.create(req.body)
    .then((trajet) => {
        console.log('Trajet Created ', trajet);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(trajet);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Localisationes');
})
.delete((req, res, next) => {
    trajet.deleteMany({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
reservationRouter.route('/add')
.post((req,res,next) => {
    reservation.create(req.body)
    .then((reservation) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(reservation);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.get((req, res, next) => {
    trajet.find(req.body).populate('arrivee').populate('depart')
    .then((trajet) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(trajet);
    }, (err) => next(err))
    .catch((err) => next(err));
})



reservationRouter.route('/:search')
.get((req,res,next) => {
    trajet.findById(req.params.id_Localisation)
    .then((Localisation) => {
        if (Localisation != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Localisation);
        }
        else {
            err = new Error('User ' + req.params.id_Localisation + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post((req, res, next) => {
    if(req.params.id_Localisation=='login'){
        trajet.findOne({ email: req.body.email})
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
         trajet.findById(req.params.id_Localisation)
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
    trajet.deleteMany({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = reservationRouter;
