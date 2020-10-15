
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ResetPassword = require('../models/resetPassword');
const User = require('../models/users');
const forget = require('../models/resetPassword');
const forgetRouter = express.Router();

forgetRouter.use(bodyParser.json());

var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var moment = require('moment');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: 'noreplyautostop@gmail.com',
        pass: 'azertyuiop/'
    }
});

forgetRouter.route('/')
.post((req, res, next) => {
        const email = req.body.email
        User.findOne(
            { email: email },// vérifier si l'adresse email envoyée par le client est présente dans la base de données(valid)
        ).then((user) => {
                if (!user) {
                    return res.json({ successEmail: false, message: 'Aucun utilisateur trouvé avec cette adresse e-mail.' });
                }
                ResetPassword.findOne({ userId: user._id, status: 0 })
                .then((resetPassword) => {
                    if (resetPassword)
                        resetPassword.deleteOne( { userId: user._id } )
                    //token = crypto.randomBytes().toString('hex')// création du token à envoyer au formulaire de mot de passe oublié (react)
                    token = Math.floor(Math.random() * Math.floor(100000));

                    ResetPassword.create({
                        userId: user._id,
                        resetPasswordToken: token,
                        expire: moment().add(1, 'days'),
                        status: 0,
                    }).then(function (item) {
                        if (!item)
                            return throwFailed(res, 'Oups problème lors de la création dun nouvel enregistrement de mot de passe')
                        let mailOptions = {
                            from: ' "<Admin Auto>" noreplyautostop@gmail.com',
                            to: user.email,
                            subject: 'Réinitialisez le mot de passe de votre compte',
                            html: '<h4><b>Réinitialiser le mot de passe</b></h4>' +
                                '<p>Code de réinitialisation de votre mot de passe:</p>' +
                                '<h2><b>' + token + '</b></h2>' +
                                '<br><br>' +
                                '<p>--AutoSTop</p>'
                        }

                        let mailSent = transporter.sendMail(mailOptions)// envoi de courrier à l'utilisateur où il peut réinitialiser le mot de passe.L'identifiant de l'utilisateur et le jeton généré sont envoyés en tant que paramètres dans un lien
                        if (mailSent) {
                            return res.json({  success: true, token: token, message: 'Vérifiez votre messagerie pour réinitialiser votre mot de passe.' })
                        } else {
                            return res.json({  success: false, message:'Incapable denvoyer des emails.'});
                        }
                    })
                })

            });

    })
.put((req, res,next) => {
    const token = req.body.resetPasswordToken
    ResetPassword.findOne({ resetPasswordToken: token, status: 0 })
        .then((resetPassword) => {
             
            if (!resetPassword) {
                return res.status(404).send({
                    message: "Token invalid !",
                    erreur: 0
                });
            }
                      
            
            if (resetPassword) {
                const current = moment().format();
                if(current > resetPassword.expire) {
                    return res.status(200).send({
                        message: "Token valid !",
                        bon: 0,
                        userId: resetPassword.userId
                    });
                } else {
                    return res.status(200).send({
                        message: "Token valid !",
                        bon: 1,
                        userId: resetPassword.userId
                    });
                }
                
            }
        }, (err) => next(err))
});


forgetRouter.post('/nouveau-password', (req, res) => {
        const userId = req.body.userId

    ResetPassword.findOne( { userId: userId, status: 0 } )
        .then( (resetPassword) => {
            if (!resetPassword) {
                res.json({ successToken: false, message: 'Invalid or expired reset token.' });
                
            }
            
            
            const query = { _id: resetPassword.userId };
            const update = {
                "$set": {
                    password: bcrypt.hashSync(req.body.password, 8)
                }
              };
            const options = { returnNewDocument: true };  
            User.updateOne(query, update, options)

            .then((data) => {
                const query = { _id: resetPassword._id };
                const update = {
                    "$set": {
                         status: 1 
                    }
                  };
                    const options = { returnNewDocument: true }; 
                   if(data) {
                    ResetPassword.updateOne(query, update, options )
                    .then((msg) => {
                            if (!msg)
                            res.json({ success: false, message: 'Password Updated Echec.' });
                            else
                                res.json({ success: true, message: 'Password Updated successfully.' });
                    }, (err) => next(err))
                   } 
                


                }, (err) => next(err));
        }, (err) => next(err))
})


forgetRouter.post('/reset', function (req, res) {
    const email = req.body.email
    User.findOne({ email: email })
        .then( (user) => {
           
            if (!user) {
                res.json({ message: 'Aucun utilisateur trouvé avec cette adresse e-mail.' });
            }
        }, (err) => next(err))
})


forgetRouter.route('/').delete((req, res, next) => {
    ResetPassword.deleteMany({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});


module.exports = forgetRouter;
