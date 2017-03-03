(function () {
    'use strict';

    function dashboardController($location, $sessionStorage, $scope) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'dashboard';
        vm.heading = 'Kitso Academic College';
        init();

        function init(){
            $scope.userType = $sessionStorage.userType;
        }

        vm.navigateTo = function (url) {
            $location.path(url);
        }
    }

    angular.module('EL').controller('dashboardController', dashboardController);
    dashboardController.$inject = ['$location', '$sessionStorage', '$scope'];
})();
