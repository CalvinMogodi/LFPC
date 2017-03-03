(function () {
    'use strict';

    angular
        .module('app')
        .controller('selectCourier', selectCourier);

    selectCourier.$inject = ['$location']; 

    function selectCourier($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'selectCourier';

        activate();

        function activate() { }
    }
})();
