(function () {
    'use strict';

    function MessageAddEditController($location, HelperService, MessageFactory, $sessionStorage, UserFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.isReadOnly = false;
        vm.isFromInbox = false;
        vm.showDownload = false;
        vm.tabs = [
            { id: 1, heading: 'Inbox', active: false, url: 'message' },
            { id: 2, heading: 'Sent Message', active: false, url: 'sentMessage' },
            
        ]
        vm.heading = 'Send New Message';

        init();
        function init() {
            vm.message = HelperService.getAssignedRecord();

            UserFactory.getUsers().then(function (results) {
                vm.users = results;
            if (vm.message) {
                vm.isReadOnly = true;
                vm.isFromInbox = true;
                vm.heading = 'View Message';
                vm.tabs.push({ id: 3, heading: 'View Message', active: true, url: '/messageAddEdit' });
                if (vm.message.file != undefined) {
                    vm.showDownload = true;
                }
            }
            else {
                vm.tabs.push({ id: 3, heading: 'Send New Message', active: true, url: '/messageAddEdit' });
            }
            });
        }

        vm.getUsersByType = function (userType) {
            var newUsers = angular.copy(vm.users);
            vm.listOfUsers = [];
            for (var i = 0; i < newUsers.length; i++) {
                if (newUsers[i].userType == userType) {
                    vm.listOfUsers.push(newUsers[i]);
                }
            }
        }

        vm.sendMessage = function (message) {
            vm.formSubmitted = true;

            if (vm.messageForm.$valid) {
                message.senderId = $sessionStorage.userId;
                message.userId = message.user.id;
                message.status = 'new';

                var f = document.getElementById('file').files[0];
                if (f != undefined) {
                   
                    var r = new FileReader();
                    r.onloadend = function (e) {
                        var data = e.target.result;
                        message.file = data;
                       
                        MessageFactory.createMessage(message).then(function (result) {
                            if (result) {
                                $location.path('/message');
                            }
                        });
                    }
                    r.readAsDataURL(f);
                } else {

                    MessageFactory.createMessage(message).then(function (result) {
                        if (result) {
                            $location.path('/message');
                        }
                    });
                }
                
            }
        }

        vm.cancel = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/message');
        }

        vm.tabClickedFunction = function (tab) {
            $location.path(tab.url);
        }

        vm.downloadAssignment = function (message) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", message.file);
            xhr.responseType = "arraybuffer";

            xhr.onload = function () {
                if (this.status === 200) {
                    var blob = new Blob([xhr.response], { type: "application/pdf" });
                    var objectUrl = URL.createObjectURL(blob);
                    window.open(objectUrl);
                }
            };
            xhr.send();
        }
    }

    angular.module('EL').controller('MessageAddEditController', MessageAddEditController);
    MessageAddEditController.$inject = ['$location', 'HelperService', 'MessageFactory', '$sessionStorage', 'UserFactory'];
})();
