'use strict';

angular.module('autopsApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl',
                authenticate: true
            });
    })
;