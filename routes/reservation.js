
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const reservation = require('../models/reservation');
const { populate } = require('../models/reservation');

const reservationRouter = express.Router();

reservationRouter.use(bodyParser.json());


reservationRouter.route('/')
.get((req,res,next) => {
    reservation.find({}).populate( {path:'trajet', populate:{path:'depart'}}).populate( {path:'trajet', populate:{path:'arrivee'}})
    .then((reservation) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(reservation);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    reservation.find(req.body).populate( {path:'trajet', populate:{path:'depart'}}).populate( {path:'trajet', populate:{path:'arrivee'}}).populate( {path:'trajet', populate:{path:'iduser'}})
    .then((reservation) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(reservation);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) => {
    console.log('reservation by add')
    reservation.create(req.body)
    .then((reservation) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(reservation);
    }, (err) => next(err))
    .catch((err) => next(err));
})



reservationRouter.route('/:iduser')
.get((req,res,next) => {
    reservation.find({iduser:req.params.iduser}).sort({_id: -1}).limit(3).populate( {path:'trajet', populate:{path:'depart'}}).populate( {path:'trajet', populate:{path:'arrivee'}}).populate( {path:'trajet', populate:{path:'iduser'}}).populate( {path:'trajet', populate:{path:'idvehicule'}})
    .then((reservation) => {
        res.statusCode = 200;
        
        res.setHeader('Content-Type', 'application/json');
        res.json(reservation);
    }, (err) => next(err))
    .catch((err) => next(err));
})

reservationRouter.route('/:idreservation')
.put((req,res,next) => {
    reservation.findById(req.params.idreservation)
    .then((reservation) => {
        if(reservation){
            reservation.etat = req.body.etat;
            reservation.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({message:"Operation effectuée"});
        }else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        console.log(reservation);
        res.json(reservation);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
//reservation trajet id sent from iduser var


reservationRouter.route('/findbyid/:idreservation')
.post((req,res,next) => {
    reservation.findByIdAndUpdate(req.params.idreservation,req.body)
    .then((reservation) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json'); 
        res.json(reservation);
    }, (err) => next(err))
    .catch((err) => next(err));
})




module.exports = reservationRouter;
