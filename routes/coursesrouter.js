const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Courses = require('../models/courses');

const coursesRouter = express.Router();

coursesRouter.use(bodyParser.json());
coursesRouter.route('/:userId')
.get((req,res,next) => {
    Courses.findById(req.params.userId)
    .populate('userId')
    .then((register) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(register);
    }, (err) => next(err))
    .catch((err) => next(err));
})

coursesRouter.route('/')
.get((req,res,next) => {
    Courses.find({})
    .then((register) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(register);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Courses.create(req.body)
    .then((register) => {
        console.log('user Created ', register);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(register);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    Courses.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

coursesRouter.route('/find')
.get((req,res,next) => {
    Courses.find({})
    .then((Courses) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Courses);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Courses.find(req.body)
    .then((courses) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(courses);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    Courses.findByIdAndUpdate(req.params.userId, {
        $set: req.body
    }, { new: true })
    .then((register) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(register);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Courses.findByIdAndRemove(req.params.userId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = coursesRouter;