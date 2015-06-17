'use strict';

angular.module('autopsApp')
    .directive('leftside', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/leftside/leftside.html',
            controller: function ($scope, $location, $state, Auth) {
                $scope.menu = [{
                    'title': 'Home',
                    'link': '/'
                }];

                $scope.isCollapsed = true;
                $scope.isLoggedIn = Auth.isLoggedIn;
                $scope.isAdmin = Auth.isAdmin;
                $scope.getCurrentUser = Auth.getCurrentUser;

                $scope.logout = function () {
                    Auth.logout();
                    $location.path('/login');
                };

                $scope.isActive = function (route) {
                    return $state.includes(route);
                };
            }
        }
    });