/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /device              ->  index
 * POST    /device              ->  create
 * GET     /device/:id          ->  show
 * PUT     /device/:id          ->  update
 * DELETE  /device/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Device = require('./device.model');
var DeviceGroup = require('./device.group.model');

// Get list of things
exports.index = function (req, res) {
    Device.find(function (err, device) {
        console.log(device);
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, device);
    });
};

// Get a single thing
exports.show = function (req, res) {
    Device.findById(req.params.id, function (err, thing) {
        if (err) {
            return handleError(res, err);
        }
        if (!thing) {
            return res.send(404);
        }
        return res.json(thing);
    });
};

// Creates a new thing in the DB.
exports.create = function (req, res) {
    Device.create(req.body, function (err, device) {
        console.log(req.body)
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, device);
    });
};

// Updates an existing thing in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Device.findById(req.params.id, function (err, thing) {
        if (err) {
            return handleError(res, err);
        }
        if (!thing) {
            return res.send(404);
        }
        var updated = _.merge(thing, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, thing);
        });
    });
};

// Deletes a thing from the DB.
exports.destroy = function (req, res) {
    Device.findById(req.params.id, function (err, thing) {
        if (err) {
            return handleError(res, err);
        }
        if (!thing) {
            return res.send(404);
        }
        thing.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};


exports.getGroups = function (req, res) {
    DeviceGroup.find(function (err, groups) {
        console.log(groups);
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, groups);
    });
};

exports.getGroupById = function (req, res) {
    DeviceGroup.findById(req.params.id, function (err, group) {
        if (err) {
            return handleError(res, err);
        }
        if (!group) {
            return res.send(404);
        }
        return res.json(group);
    });
};


exports.createGroups = function (req, res) {
    DeviceGroup.create(req.body, function (err, group) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, group);
    });
};

exports.updateGroups = function (req, res) {
    var updateAction = function (i) {
        DeviceGroup.findById(i._id, function (err, group) {
            var updated=_.extend(group, i);
            updated.save(function (err, g) {
                //console.log(g)
                if (err) {
                    console.log(err)
                    return err;
                }
            });
        });
    };
    req.body.forEach(function(item){
        updateAction(item)
    })
    //DeviceGroup.find(function (err, groups) {
    //    console.log(groups);
    //});
    return res.json(200, res.body);
};
exports.updateGroupById = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    DeviceGroup.findById(req.params.id, function (err, group) {
        if (err) {
            return handleError(res, err);
        }
        if (!group) {
            return res.send(404);
        }
        var updated = _.extend(group, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, group);
        });
    });
};

exports.destroyGroup = function (req, res) {
    DeviceGroup.findById(req.params.id, function (err, group) {
        if (err) {
            return handleError(res, err);
        }
        if (!group) {
            return res.send(404);
        }
        group.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}