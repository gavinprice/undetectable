'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
    labs = require('../../app/controllers/lab.server.controller');

module.exports = function(app) {

    /*app.route('/labs')
        .get(labs.list)
        .post(users.requiresLogin, labs.create);

    app.route('/labs/:labId')
        .get(labs.read)
        .put(users.requiresLogin, labs.hasAuthorization, labs.update)
        .delete(users.requiresLogin, labs.hasAuthorization, labs.delete);

    // Finish by binding the article middleware
    app.param('labId', labs.LabByID); */
};