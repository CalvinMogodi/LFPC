(function () {
    'use strict';

    function aboutUsController($location) {
        /* jshint validthis:true */
        var vm = this;

        vm.navigate = function (url) {
            $location.path(url);
        }

        vm.openToolsMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
    }

    angular.module('EL').controller('aboutUsController', aboutUsController);
    aboutUsController.$inject = ['$location'];
})();
