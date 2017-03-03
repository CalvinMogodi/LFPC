(function () {
    'use strict';

    function servicesController($location) {
        /* jshint validthis:true */
        var vm = this;

        vm.navigate = function (url) {
            $location.path(url);
        }

        vm.openToolsMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
    }

    angular.module('EL').controller('servicesController', servicesController);
    servicesController.$inject = ['$location'];
})();
