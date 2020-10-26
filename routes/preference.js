
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const preference = require('../models/preference');

const preferenceRouter = express.Router();

preferenceRouter.use(bodyParser.json());


// Get all preference
preferenceRouter.route('/').get((req, res) => {
    preference.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data)
           
        }
    })
})


// Get all preference by user
preferenceRouter.route('/user/:id').get((req, res,next) => {
    preference.find({iduser:req.params.id}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data)
        }
    })
})


// Add preference
preferenceRouter.route('/').post((req, res, next) => {
    preference.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, message: 'Préférence créer avec succès.' });
        }
    })
});


// Get single véhivule
preferenceRouter.route('/:id').get((req, res) => {
    preference.findById(req.params.id, (error, data) => {
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
preferenceRouter.route('/:id').put((req, res, next) => {
    preference.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data)
            console.log('preference successfully updated!')
        }
    })
})

// Delete véhivule
preferenceRouter.route('/:id').delete((req, res, next) => {
    preference.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})
module.exports = preferenceRouter;
