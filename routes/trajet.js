
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const trajet = require('../models/trajet');

const trajetRouter = express.Router();

trajetRouter.use(bodyParser.json());


trajetRouter.route('/')
.get((req,res,next) => {
    trajet.find( {}).populate('arrivee').populate('depart')
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
}).put((req, res, next) => {
    trajet.find(req.body).populate('arrivee').populate('depart')
    .then((trajet) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(trajet);
    }, (err) => next(err))
    .catch((err) => next(err));
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



trajetRouter.route('/:idtrajet')
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
.get((req,res,next) => {
    trajet.findById(req.params.idtrajet).populate('arrivee').populate('depart').populate('iduser')
    .then((trajet) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(trajet);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    trajet.findById(req.params.idtrajet)
    .then((trajet) => {
        if(trajet != null){
            if(req.body.nombre_place)
                trajet.nbplace_reserver=req.body.nombre_place;

            if(req.body.etat)
                trajet.etat= req.body.etat;

                trajet.save()
        }
        else{
            err = new Error('Trajet' + req.params.idtrajet + ' not found');
            err.status = 404;
            return next(err); 
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})


trajetRouter.route('/find/')
.post((req, res, next) => {
    trajet.find(req.body).populate('arrivee').populate('depart')
    .then((trajet) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(trajet);
    }, (err) => next(err))
    .catch((err) => next(err));
})

trajetRouter.route('/find/:idconducteur')
.get((req,res,next) => {
    trajet.find({iduser:req.params.idconducteur}).populate('arrivee').populate('depart').populate('iduser')
    .then((trajets) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(trajets);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    trajet.find(req.body).populate('arrivee').populate('depart')
    .then((trajet) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(trajet);
    }, (err) => next(err))
    .catch((err) => next(err));
})



trajetRouter.route('/:search')
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


module.exports = trajetRouter;
