(function () {
    'use strict';

    function contactUsController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.send = function (message) {
            vm.messageSent = false;
            vm.formSubmitted = true;

            if (vm.messageForm.$valid) {
                vm.messageSent = true;
            }

        }

        vm.navigate = function (url) {
            $location.path(url);
        }

        vm.openToolsMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
    }

    angular.module('EL').controller('contactUsController', contactUsController);
    contactUsController.$inject = ['$location'];
})();
