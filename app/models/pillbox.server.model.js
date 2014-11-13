'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Pillbox Schema
 */
var PillboxSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
    isCompliant: {
        type: Boolean
    },
	reason: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Pillbox', PillboxSchema);