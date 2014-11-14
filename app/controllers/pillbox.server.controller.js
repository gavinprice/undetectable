'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Pillbox = mongoose.model('Pillbox'),
	_ = require('lodash');

/**
 * Create a pillbox
 */
exports.create = function(req, res) {
	var pillbox = new Pillbox(req.body);
	pillbox.user = req.user;

	pillbox.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(pillbox);
		}
	});
};

/**
 * Show the current pillbox
 */
exports.read = function(req, res) {
	res.json(req.pillbox);
};

/**
 * Update a pillbox
 */
exports.update = function(req, res) {
	var pillbox = req.pillbox;

	pillbox = _.extend(pillbox, req.body);

	pillbox.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(pillbox);
		}
	});
};

/**
 * Delete an pillbox
 */
exports.delete = function(req, res) {
	var pillbox = req.pillbox;

	pillbox.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(pillbox);
		}
	});
};

/**
 * List of Pillbox
 */
exports.list = function(req, res) {
	Pillbox.find().sort('-created').where('user').equals(req.user._id).populate('user', 'displayName').exec(function(err, pillboxs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(pillboxs);
		}
	});
};

/**
 * Pillbox middleware
 */
exports.pillboxByID = function(req, res, next, id) {
	Pillbox.findById(id).populate('user', 'displayName').exec(function(err, pillbox) {
		if (err) return next(err);
		if (!pillbox) return next(new Error('Failed to load pillbox ' + id));
		req.pillbox = pillbox;
		next();
	});
};

/**
 * Pillbox authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.pillbox.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};