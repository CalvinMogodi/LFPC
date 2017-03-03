(function () {
    'use strict';

    function LoginController($location, $scope, $sessionStorage, $rootScope, LoginService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'indexController';
        vm.selectedIndex = 0;
        $rootScope.profileImage = 'assets/img/placeholder.png';

        vm.login = function () {

            vm.loginFormSubmitted = true;

            if (vm.loginForm.$valid) {

            }

            //UserFactory.loginUser(vm.user.username, vm.user.password).then(function (results){
            //    if (results != undefined) {
            //        $sessionStorage.isUserAuthenticated = true;
            //        $sessionStorage.userId = results.id;
            //        $sessionStorage.courseId = results.courseId;
                        
            //        $sessionStorage.displayName = results.firstname + ' ' + results.surname;
            //        if (results.userType == 'student') {
            //            $sessionStorage.userType = 'student';                     
            //        } else if (results.userType == 'lecturer') {
            //            $sessionStorage.userType = 'lecturer';
            //        } else if (results.userType == 'admin') {
            //            $sessionStorage.userType = 'admin';
            //        }
            //        $location.path('/dashboard');
                    
            //    } else {
            //        vm.message = 'Incorrect username or password!!'; 
            //    }
            //});
           
        }

        vm.nextTab = function () {
            //UserFactory.gettbUser(vm.user.username).then(function (data) {
            //    if (data != null) {
            //            vm.selectedIndex = 1;
            //            vm.fpMessage = undefined;
            //            vm.thisUser = data;
            //        } else {
            //            vm.message = 'Incorrect username!!';
            //        }
                
            //});
           
        }

        vm.backTab = function () {
            vm.selectedIndex = 0;
        }

        vm.changePassword = function () {
            if (vm.user.newPassword == vm.user.confirmNewPassword) {
                vm.thisUser.password = vm.user.newPassword;
                //UserFactory.editUser(vm.thisUser).then(function (result) {
                //    if (result) {
                //        vm.message = undefined;
                //        vm.selectedIndex = 0;
                //    } else {
                //        vm.message = 'Password is not changed, Please try again!!';
                //    }

                //});
            } else {
                vm.fpMessage = 'Your passwords does not match!!';
            }
        }
    }

    angular.module('LFPC').controller('LoginController', LoginController);
    LoginController.$inject = ['$location', '$scope', '$sessionStorage', '$rootScope', 'LoginService'];
})();
