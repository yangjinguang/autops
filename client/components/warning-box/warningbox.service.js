'use strict';

angular.module('autopsApp')
    .factory('WarningBox', function ($modal) {
        return function (content, callback) {
            var modal = $modal({
                content: content,
                backdrop: 'static',
                template: 'components/warning-box/warningbox.template.html',
                show: true
            });
            var res = false;
            modal.$scope.ok = function () {
                modal.$scope.$hide();
                if(callback){
                    callback()
                }
            }
        }

    })