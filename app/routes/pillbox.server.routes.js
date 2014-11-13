'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	pillboxs = require('../../app/controllers/pillbox.server.controller');

module.exports = function(app) {
	// Pillbox Routes
	app.route('/pillboxs')
		.get(pillboxs.list)
		.post(users.requiresLogin, pillboxs.create);

	app.route('/pillboxs/:pillboxId')
		.get(pillboxs.read)
		.put(users.requiresLogin, pillboxs.hasAuthorization, pillboxs.update)
		.delete(users.requiresLogin, pillboxs.hasAuthorization, pillboxs.delete);

	// Finish by binding the pillbox middleware
	app.param('pillboxId', pillboxs.pillboxByID);
};