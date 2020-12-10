const express = require('express');
const mongoose = require('mongoose');
const Users = require('../models/users');
const multer = require('../config/multer-config');
const bodyParser = require('body-parser');
const uploadRouter = express.Router();

const fs = require('fs');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

uploadRouter.post('/:id_user', (req, res) => {
    const filename='./images/'+req.params.id_users+Date.now()+'.png'
	fs.writeFile(filename, req.body.imgsource, 'base64', (err) => {
		if (err) console.log(err.message)
	}).then(
        users.findByIdAndUpdate(req.params.id_users,{ imageUrl: filename})
    )
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true});
})

/*
uploadRouter.post("/:id_user", multer, (req, res, next) => {

    const file = req.file;
    console.log(req.params.id_user)
    if (!file) {
        res.json({ success: false, message: 'Image Updated Echec.' });
    } else {
        Users.findById(req.params.id_user)
            .then((user) => {
                if (user) {
                    const extension = MIME_TYPES[file.mimetype];
                    const query = { _id: req.params.id_user };
                    const update = {
                        "$set": {
                            imageUrl: `/images/${req.file.filename}`
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
*/

module.exports = uploadRouter;