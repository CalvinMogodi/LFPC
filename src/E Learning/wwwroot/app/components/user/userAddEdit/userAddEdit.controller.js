(function () {
    'use strict';

    function UserAddEditController($location, HelperService, UserFactory,CourseFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.isEdit = false;

        init();
        function init() {
            CourseFactory.getCourses().then(function (data) {
                vm.user = HelperService.getAssignedRecord();
                vm.heading = 'Add New User';
                if (vm.user) {
                    vm.isEdit = true;
                    vm.heading = 'Update User';
                    vm.user.confirmPassword = vm.user.password;
                }            
                vm.courses = data;
            });
        }

        vm.create = function (user) {

            vm.formSubmitted = true;

            if (vm.userForm.$valid) {
                var newRecord = {
                    Firstname: user.firstname,
                    Surname: user.surname,
                    UserType: user.userType,
                    Username: user.username,
                    Password: user.password,
                    Id: 0,
                };
                if (newRecord.UserType == 'student') {
                    newRecord.StudentNumber = user.studentNumber;
                    newRecord.CourseId = user.course.id;
                }
                UserFactory.createUser(newRecord).then(function (result) {
                    if (result) {
                        $location.path('/user');
                    }                   
                });
                
            }
        }

        vm.update = function (user) {
            vm.formSubmitted = true;

            if (vm.userForm.$valid) {

                if (user.userType == 'student') {
                    user.CourseId = user.course.id;
                }
                UserFactory.editUser(user).then(function (result) {
                    if (result) {
                        $location.path('/user');
                    } else {
                        vm.message = 'Password is not changed, Please try again!!';
                    }

                });
            }
        }

        vm.cancel = function () {
            $location.path('/user');
        }
    }

    angular.module('EL').controller('UserAddEditController', UserAddEditController);
    UserAddEditController.$inject = ['$location', 'HelperService', 'UserFactory', 'CourseFactory'];
})();
