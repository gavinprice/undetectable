'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Lab Schema
 */
var LabSchema = new Schema({
    labDate: {
        type: Date,
        default: Date.now
    },
    tcell: {
        type: String,
        default: '',
        trim: true,
        required: 'Cannot be blank'
    },
    vload: {
        type: String,
        default: '',
        trim: true,
        required: 'Cannot be blank'
    },
    undetectable: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Lab', LabSchema);