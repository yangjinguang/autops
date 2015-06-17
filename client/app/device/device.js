'use strict';

angular.module('autopsApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/device', '/device/view');
        $stateProvider
            .state('device', {
                url: '/device',
                templateUrl: 'app/device/device.html',
                controller: 'DeviceCtrl',
                authenticate: true
            })
            .state('device.view', {
                url: '/view',
                templateUrl: 'app/device/device.view.html',
                controller: 'DeviceViewCtrl',
                authenticate: true
            });
    })
;