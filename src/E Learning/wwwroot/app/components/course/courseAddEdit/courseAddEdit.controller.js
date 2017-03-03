(function () {
    'use strict';

    function CourseAddEditController($location, HelperService, CourseFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.isEdit = false;

        init();
        function init() {
            vm.course = HelperService.getAssignedRecord();
            vm.heading = 'Add New Course';
            if (vm.course) {
                vm.isEdit = true;
                vm.heading = 'Update Course';
            }

        }

        vm.create = function (course) {

            vm.formSubmitted = true;

            if (vm.courseForm.$valid) {
                CourseFactory.createCourse(course).then(function (result){
                    if (result) {
                        $location.path('/course');
                    }
                });
            }
        }

        vm.update = function (course) {
            vm.formSubmitted = true;

            if (vm.courseForm.$valid) {
                CourseFactory.editCourse(course).then(function (result) {
                    if (result) {
                        $location.path('/course');
                    }
                });
               
            }
        }

        vm.cancel = function () {
            $location.path('/course');
        }
    }

        angular.module('EL').controller('CourseAddEditController', CourseAddEditController);
        CourseAddEditController.$inject = ['$location', 'HelperService', 'CourseFactory'];
})();
