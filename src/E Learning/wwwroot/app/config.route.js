(function () {
    'use strict';

    var routeProvider = function ($routeProvider, $locationProvider) {

        var viewBase = '/app/components';
        var viewcommonBase = '/app/common';

        $routeProvider.when('/index', {
            controller: 'indexController',
            templateUrl: 'index.html',
            controllerAs: 'vm'
        }).when('/login', {
            controller: 'LoginController',
            templateUrl: viewcommonBase + '/login/login.html',
            controllerAs: 'vm'
        }).when('/requestCourier', {
            controller: 'requstCourierController',
            templateUrl: viewBase + '/requestCourier/requestCourier.html',
            controllerAs: 'vm'
        }).when('/signUp', {
            controller: 'signUpController',
            templateUrl: viewcommonBase + '/signUp/signUp.html',
            controllerAs: 'vm'
        }).
            when('/home', {
                controller: 'homeController',
                templateUrl: viewBase + '/home/home.html',
                controllerAs: 'vm'
            }).otherwise({ redirectTo: '/' });
    }

    angular.module('LFPC').config(['$routeProvider', '$locationProvider', routeProvider]);
    routeProvider.$inject = ['$routeProvider', '$locationProvider'];

})();