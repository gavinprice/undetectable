'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Lab = mongoose.model('Lab'),
    _ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
    var lab = new Lab(req.body);
    lab.user = req.user;

    lab.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(lab);
        }
    });
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
    res.json(req.lab);
};

/**
 * Show the current article
 */
exports.delete = function(req, res) {
    res.json(req.lab);
};

/**
 * Update a lab
 */
exports.update = function(req, res) {
    var lab = req.lab;

    lab = _.extend(lab, req.body);

    lab.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(lab);
        }
    });
};


/**
 * List of Articles
 */
exports.list = function(req, res) {
    Lab.find().sort('-created').populate('user', 'displayName').exec(function(err, labs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(labs);
        }
    });
};

/**
 * Article middleware
 */
exports.LabByID = function(req, res, next, id) {
    Lab.findById(id).populate('user', 'displayName').exec(function(err, lab) {
        if (err) return next(err);
        if (!lab) return next(new Error('Failed to load lab ' + id));
        req.lab = lab;
        next();
    });
};

exports.LatestLab = function(req, res, next, id) {
    Lab.find().limit(1).sort({$natural:-1}).exec(function(err, lab) {
        if (err) return next(err);
        if (!lab) return next(new Error('Failed to load lab ' + id));
        req.lab = lab;
        next();
    });
};


/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.article.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};