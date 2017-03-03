(function () {
    'use strict';

    function signUpController($firebaseArray, $location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'Sign Up';
        var ref = new Firebase("https://lfpc-221e1.firebaseio.com/User");

        vm.userSignUp = function (user) {
            vm.userFormSubmitted = true;

            if (vm.userForm.$valid) {
                var AddEvent = $firebaseArray(ref);
                AddEvent.$add(user);
            }
        }

        vm.courierSignUp = function (courier) {
            vm.courierFormSubmitted = true;

            if (vm.courierForm.$valid) {

            }
        }


    }

    angular.module('LFPC').controller('signUpController', signUpController);
    signUpController.$inject = ['$firebaseArray', '$location'];
})();
