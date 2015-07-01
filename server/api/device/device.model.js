'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DeviceSchema = new Schema({
    name: String,
    displayName: String,
    ip: String,
    type: String,
    status: Number,
    info: String
});

module.exports = mongoose.model('Device', DeviceSchema);
