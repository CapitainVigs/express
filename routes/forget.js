
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
    auth: {
        user: 'noreplyautostop@gmail.com',
        pass: 'azertyuiop/'
    }
});

forgetRouter.route('/')
    .get((req, res, next) => {
        ResetPassword.find({})
            .then((resetPassword) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resetPassword);
            }, (err) => next(err))
            .catch((err) => next(err));
    })


forgetRouter.route('/reset-password')
    .post((req, res, next) => {
        const email = req.body.email
        console.log(email)
        User.findOne(
            { email: email },// vérifier si l'adresse email envoyée par le client est présente dans la base de données(valid)

        )

            .then((user) => {
                console.log(user)
                if (!user) {
                    return throwFailed(res, 'Aucun utilisateur trouvé avec cette adresse e-mail.')
                }
                ResetPassword.findOne({
                    where: { userId: user._id, status: 0 },
                }).then((resetPassword) => {
                    if (resetPassword)
                        resetPassword.destroy({ where: { id: resetPassword.id } })
                    //token = crypto.randomBytes().toString('hex')// création du token à envoyer au formulaire de mot de passe oublié (react)
                    token = Math.floor(Math.random() * Math.floor(100000));

                    ResetPassword.create({
                        userId: user._id,
                        resetPasswordToken: token,
                        expire: moment.utc().add(86400, 'seconds'),
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
                            return res.json({  success: true, message: 'Vérifiez votre messagerie pour réinitialiser votre mot de passe.' })
                        } else {
                            return throwFailed(error, 'Incapable denvoyer des emails.');
                        }
                    })
                })

            });

    })

forgetRouter.post('/verify-token', (req, res) => {
    const token = req.body.resetPasswordToken

    ResetPassword.findOne({ resetPasswordToken: token })
        .then((resetPassword) => {

            if (!resetPassword) {
                return throwFailed(res, 'Token invalide.')
            }

            if (resetPassword) {
                return res.status(200).send({
                    message: "Token valid !",
                    bon: 1,
                    userId: resetPassword.userId
                });
            }
        }, (err) => next(err))
});


forgetRouter.post('/nouveau-password', (req, res) => {
        const userId = req.body.userId

    ResetPassword.findOne( { userId: userId, status: 0 } )
        .then( (resetPassword) => {
            if (!resetPassword) {
                return throwFailed(res, 'Invalid or expired reset token.')
            }
            const userId = resetPassword.userId


            User.update({
                password: bcrypt.hashSync(req.body.password, 8),
            },
                { where: { _id: userId } }
            ).
                then(() => {
                    ResetPassword.update({
                        status: 1
                    }, { where: { _id: resetPassword._id } }).
                        then((msg) => {
                            if (!msg)
                                throw err
                            else
                                res.json({ success: true, message: 'Password Updated successfully.' })
                        }, (err) => next(err))


                }, (err) => next(err));
        }, (err) => next(err))
})


forgetRouter.post('/reset', function (req, res) {
    const email = req.body.email
    User.findOne({ email: email })
        .then(function (user) {
            console.log(user)
            if (!user) {
                return throwFailed(res, 'Aucun utilisateur trouvé avec cette adresse e-mail.')
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
