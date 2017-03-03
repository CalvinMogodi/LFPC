(function () {
    'use strict';

    function homeController($location, $window) {
        /* jshint validthis:true */
        var vm = this;

        vm.navigate = function (url) {
            $location.path(url);
        }

        vm.openToolsMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

    }

    angular.module('LFPC').controller('homeController', homeController);
    homeController.$inject = ['$location', '$window'];
})();
