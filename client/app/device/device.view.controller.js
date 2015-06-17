'use strict';

angular.module('autopsApp')
    .controller('DeviceViewCtrl', function ($scope, $timeout, $http, socket, $aside, $modal, deviceGroup, WarningBox) {

        var dataInit = {
            allGroups: function () {
                deviceGroup.getAll({}, function (res) {
                    console.log(res);
                    $scope.deviceGroups = res
                }, function (error) {
                    console.log(error)
                })
            },
            group: function (group) {
                deviceGroup.get({id: group._id}, function (res) {
                    console.log(res);
                    group = res
                }, function (error) {
                    console.log(error)
                })
            }
        };
        dataInit.allGroups();
        $scope.getGroup = function () {
            deviceGroup.get({id: 'test'}, function (res) {
                console.log(res);
                return res;
            }, function (error) {
                console.log(error)
            })
        };


        var gridsterData = $scope.gridsterData = {};
        gridsterData.customItemMap = {
            sizeX: 'item.size.x',
            sizeY: 'item.size.y',
            row: 'item.position[0]',
            col: 'item.position[1]',
            minSizeY: 'item.minSizeY',
            maxSizeY: 'item.maxSizeY'
        };
        gridsterData.gridsterOpts = { //gridster配置项
            floating: true,
            pushing: true,
            swapping: true,
            margins: [10, 10],
            //mobileModeEnabled: false,
            colWidth: 250,
            rowHeight: 400,
            columns: 4,
            defaultSizeX: 1,
            defaultSizeY: 1,
            //maxSizeX: 2,
            //maxSizeY: 1,
            resizable: {
                enabled: false,
                handles: ['se'],
                start: function (event, $element, widget) {
                    $element.css('boxShadow', '0 2px 6px 0 #D5D5D5')
                }
                , // optional callback fired when resize is started,
                resize: function (event, $element, widget) {
                }
                , // optional callback fired when item is resized,
                stop: function (event, $element, widget) {
                    $element.css('boxShadow', 'none');
                } // optional callback fired when item is finished resizing
            },
            draggable: {
                enabled: true,
                handle: '.device-group-drag',
                start: function (event, $element, widget) {
                    debugger;
                    //$element.css('zIndex', '99')
                }, // optional callback fired when drag is started,
                drag: function (event, $element, widget) {
                }, // optional callback fired when item is moved,
                stop: function (event, $element, widget) {
                    //$element.css('zIndex', curlCss/100)
                    var postData = []
                    angular.forEach($scope.deviceGroups, function (item) {
                        var tmp = {
                            _id: item._id,
                            position: item.position
                        };
                        postData.push(tmp)
                    });
                    deviceGroup.update(postData, function (res) {

                    })
                } // optional callback fired when item is finished dragging
            }
        };
        $scope.deviceTypes = [
            {
                name: 'switch',
                displayName: '交换机'
            },
            {
                name: 'server',
                displayName: '服务器'
            }
        ];
        $scope.addGroup = function (item) {

            var groupModal = $modal({
                title: item ? '编辑分组' : '新建分组',
                backdrop: 'static',
                template: 'app/device/template/device.addgroup.template.html',
                show: true
            });
            var modalScope = groupModal.$scope;

            modalScope.formData = item ? angular.copy(item) : {};
            modalScope.save = function () {
                if (item) {
                    deviceGroup.update({
                        id: item._id,
                        name: modalScope.formData.name
                    }, function (res) {
                        dataInit.allGroups();
                        modalScope.$hide();
                    }, function (err) {
                        console.log(err)
                    })
                } else {
                    deviceGroup.create({}, {
                        name: modalScope.formData.name
                    }, function (group) {
                        console.log(group);
                        dataInit.allGroups();
                        modalScope.$hide();
                    })
                }

            }
        };
        $scope.groupRm = function (group) {
            console.log(group)
            WarningBox("确定要删除此分组吗", function () {
                deviceGroup.delete({id: group._id}, function (res) {
                    dataInit.allGroups();
                }, function (err) {
                    console.log(err)
                })

            });

        }
        $scope.deviceAdd = function (deviceGroup) {

            var deviceAside = $aside({
                //scope: $scope,
                animation: 'am-slide-right',
                placement: 'right',
                container: 'body',
                title: '设备添加',
                backdrop: 'static',
                template: 'app/device/template/device.info.template.html',
                show: true
            });
            var scope = deviceAside.$scope;
            scope.type = 'add';
            scope.device = {};
        }

        $scope.customOpts = {
            floating: true,
            pushing: true,
            swapping: true,
            margins: [0, 0],
            //mobileModeEnabled: false,
            colWidth: 'auto',
            rowHeight: 50,
            columns: 1,
            defaultSizeX: 1,
            defaultSizeY: 1,
            resizable: {
                enabled: false,
                handles: ['se'],
                start: function (event, $element, widget) {
                    $element.css('boxShadow', '0 2px 6px 0 #D5D5D5')
                }
                , // optional callback fired when resize is started,
                resize: function (event, $element, widget) {
                }
                , // optional callback fired when item is resized,
                stop: function (event, $element, widget) {
                    $element.css('boxShadow', 'none');
                } // optional callback fired when item is finished resizing
            }
        }
        $scope.deviceInfo = function (device) {

            var deviceAside = $aside({
                //scope: $scope,
                animation: 'am-slide-right',
                placement: 'right',
                container: 'body',
                title: '设备详情',
                backdrop: 'static',
                template: 'app/device/template/device.info.template.html',
                show: true
            });
            var scope = deviceAside.$scope;
            scope.type = 'info';
            scope.device = device ? device : {};
        }

    });
