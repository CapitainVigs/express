
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
preferenceRouter.route('/:id').get((req, res,next) => {
    preference.find({iduser:req.params.id}, (error, data) => {
        if (error) {
            return next(error)
        } else {
           // if(data==null)
            console.log(data[0]);
            if(data[0]==undefined){
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.json(null)
            }else{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(data)
            }
           
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
            res.json(data)
        }
    })
});




// Update véhivule
preferenceRouter.route('/:id').put((req, res, next) => {
    
    const query = { _id: req.params.id };
            const update = {
                "$set": {
                    fume: req.body.fume,
                    music: req.body.music
                }
              };
            const options = { returnNewDocument: true };  
            preference.updateOne(query, update, options)

        .then((preference) => {
            if (preference != null) {
                            
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, message: 'Préférence Updated successfully.' });
            }
            else {
                res.json({ success: false, message: 'Préférence Updated Echec.' });
                
            }
        }, (err) => next(err))
        .catch((err) => next(err));
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