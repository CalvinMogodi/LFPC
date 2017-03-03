(function () {
    'use strict';

    function MessageController($location, HelperService, MessageFactory, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'MessageController';
        vm.inboxmessages = [];
        vm.tabs = [
            { id: 1, heading: 'Inbox', active: true, url: 'message' },
            { id: 2, heading: 'Sent Message', active: false, url: 'sentMessage' },
            { id: 3, heading: 'Send New Message', active: false, url: '/messageAddEdit' }
        ]

        init();
        function init() {
            MessageFactory.getMessagesByUserId($sessionStorage.userId).then(function (data) {
                vm.inboxmessages = data;
            });
        }

        vm.newMessage = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/messageAddEdit');
        }

        vm.viewMessage = function (message) {
            message.isFromSent = false;
            HelperService.assignCurrentRecord(message);
            $location.path('/messageAddEdit');
        }

        vm.tabClickedFunction = function (tab) {
            $location.path(tab.url);
        }
    }

    angular.module('EL').controller('MessageController', MessageController);
    MessageController.$inject = ['$location', 'HelperService', 'MessageFactory', '$sessionStorage'];
})();
