'use strict';

angular.module('autopsApp')
    .factory('DeviceGroup', function ($resource) {
        return $resource('/api/device/group/:id', {
                id: '@_id'
            },
            {
                create: {
                    method: 'POST'
                },
                getAll: {
                    method: 'GET',
                    isArray: true
                },
                get:{
                    method: 'GET'
                },

                updateALl: {
                    method: 'PUT',
                    isArray: true
                },
                update: {
                    method: 'PUT',
                    params:{
                        id:'@id'
                    }
                },
                delete:{
                    method: 'DELETE',
                    params:{
                        id:'@id'
                    }
                }
            });
    })
    .factory('Device', function ($resource) {
        return $resource('/api/device/:id', {
                id: '@_id'
            },
            {
                create: {
                    method: 'POST'
                },
                getAll: {
                    method: 'GET',
                    isArray: true
                },
                get:{
                    method: 'GET'
                },
                update: {
                    method: 'PUT',
                    params:{
                        id:'@id'
                    }
                },
                delete:{
                    method: 'DELETE',
                    params:{
                        id:'@id'
                    }
                }
            });
    });;
