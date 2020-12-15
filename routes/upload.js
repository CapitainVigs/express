const express = require('express');
const mongoose = require('mongoose');
const Users = require('../models/users');
const bodyParser = require('body-parser');
const uploadRouter = express.Router();

const fs = require('fs');

uploadRouter.post('/:id_user', (req, res) => {
    const filename='./images/'+req.params.id_user+'_'+Date.now()+'.png';
    const update = {
        "$set": {
          "imageUrl": filename
        }
      };
      console.log('file name is '+filename);
      users.findByIdAndUpdate({_id:req.params.id_user},update,{ returnNewDocument: true })    
       .then(updatedDocument => {
          if(updatedDocument) {
            console.log(`Successfully updated document: ${updatedDocument}.`)
          } else {
            console.log("No document matches the provided query.")
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(updatedDocument);
        })
        .catch(err => console.error(`Failed to find and update document: ${err}`))
/*
	fs.writeFile(filename, req.body.imgsource, 'base64', (err) => {
		if (err) console.error(`Failed to find and update document: ${err}`)
	})
       */
  
})


module.exports = uploadRouter;