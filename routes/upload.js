const express = require('express');
const mongoose = require('mongoose');

const Users = require('../models/users');
const multer = require('../config/multer-config')
const uploadRouter = express.Router();

const fs = require('fs');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };



uploadRouter.post("/upload", multer, (req, res, next) => {

       const file = req.file;
       console.log(req.body.id_users)
        if(!file){
            res.json({ success: false, message: 'Image Updated Echec.' });
        } else {
        Users.findById(req.body.id_users)
        .then((user) => {
            if(user) {
                console.log(req.body.id_users+ '_'+'PROFILE')
                const extension = MIME_TYPES[file.mimetype];
                const query = { _id: req.body.id_users };
                const update = {
                    "$set": {
                        imageName: 'PROFILE'+ '_'+ Date.now()+'.'+extension,
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                  };
                const options = { returnNewDocument: true };  
                Users.updateOne(query, update, options)
                .then((msg) => {
                    if (!msg)
                    res.json({ success: false, message: 'Echec upload image.' });
                    else
                        res.json({ success: true, message: 'successfully upload image.' });
            }, (err) => next(err))
            }
        }, (err) => next(err))
    }
    })


module.exports = uploadRouter;