'use strict';

angular.module('autopsApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/dashboard', '/dashboard/view');
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'DashboardCtrl',
                authenticate: true
            })
            .state('dashboard.view', {
                url: '/view',
                templateUrl: 'app/dashboard/dashboard.view.html',
                controller: 'DashboardViewCtrl',
                authenticate: true
            });
    })
;