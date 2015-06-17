'use strict';

var express = require('express');
var controller = require('./device.controller');

var router = express.Router();


router.get('/', controller.index);
router.get('/group', controller.getGroups);
router.get('/group/:id', controller.getGroupById);
router.get('/:id', controller.show);
router.post('/group', controller.createGroups);
router.post('/', controller.create);
router.put('/group/:id', controller.updateGroupById);
router.put('/group', controller.updateGroups);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/group/:id', controller.destroyGroup);
router.delete('/:id', controller.destroy);


module.exports = router;