'use strict';

angular.module('autopsApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/monitor', '/monitor/view');
        $stateProvider
            .state('monitor', {
                url: '/monitor',
                templateUrl: 'app/monitor/monitor.html',
                controller: 'ServiceCtrl',
                authenticate: true
            })
            .state('monitor.view', {
                url: '/view',
                templateUrl: 'app/monitor/monitor.view.html',
                controller: 'MonitorViewCtrl',
                authenticate: true
            });
    })
;