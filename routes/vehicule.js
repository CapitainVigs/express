
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const vehicule = require('../models/vehicule');

const vehiculeRouter = express.Router();

vehiculeRouter.use(bodyParser.json());



// Get all véhicule
vehiculeRouter.route('/').get((req, res) => {
    vehicule.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data)
           
        }
    })
})


// Get all véhicule by user
vehiculeRouter.route('/user/:id').get((req, res) => {
    vehicule.find({iduser:req.params.id}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data)
        }
    })
})


// Add véhicule
vehiculeRouter.route('/').post((req, res, next) => {
    vehicule.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }
    })
});


// Get single véhivule
vehiculeRouter.route('/:id').get((req, res) => {
    vehicule.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data)
        }
    })
})


// Update véhivule
vehiculeRouter.route('/:id').put((req, res, next) => {
    vehicule.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data)
            console.log('Véhicule successfully updated!')
        }
    })
})

// Delete véhivule
vehiculeRouter.route('/:id').delete((req, res, next) => {
    vehicule.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})



module.exports = vehiculeRouter;
