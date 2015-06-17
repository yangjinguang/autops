'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DeviceGroupSchema = new Schema({
    name: String,
    position:[Number,Number]
});

module.exports = mongoose.model('DeviceGroup', DeviceGroupSchema);