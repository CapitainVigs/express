
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
    reservation.find(req.body).populate( {path:'trajet', populate:{path:'depart'}}).populate( {path:'trajet', populate:{path:'arrivee'}}).populate('iduser')
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


reservationRouter.route('/:iduser')
.get((req,res,next) => {
    reservation.find({iduser:req.params.iduser}).populate( {path:'trajet', populate:{path:'depart'}}).populate( {path:'trajet', populate:{path:'arrivee'}})
    .then((reservation) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(reservation);
    }, (err) => next(err))
    .catch((err) => next(err));
})
//reservation trajet id sent from iduser var






module.exports = reservationRouter;
