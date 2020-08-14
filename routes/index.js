var express = require('express');
var router = express.Router();
const Users = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/',function(req, res, next) {
    
  Users.findOne({ email: req.body.email})
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
      
})
module.exports = router;
