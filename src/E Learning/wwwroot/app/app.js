(function () {
    'use strict';

    var app = angular.module('LFPC', ['ngRoute', 'firebase', 'ngStorage', 'ngMaterial', 'ngMessages', 'ngMenuSidenav', 'md.data.table', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'angularMoment']);
    app.constant('firebaseUrl', 'https://lfpc-221e1.firebaseio.com');
    app.constant('apiUrl', 'http://localhost:64977/api/');
    app.run(function ($rootScope, $location, $sessionStorage, $timeout) {
        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.currentUrl = $location.path();
        });
    });

})();
