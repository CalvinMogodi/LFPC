(function () {
    'use strict';

    angular.module('LFPC').controller('requstCourierController', requstCourierController);
    requstCourierController.$inject = ['$location'];

    function requstCourierController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'requstCourier';

        activate();

        function activate() { }
    }
})();
