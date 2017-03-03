(function () {
    'use strict';

    function SubjectAddEditController($location, HelperService, SubjectFactory, CourseFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.isEdit = false;

        init();
        function init() {
            vm.subject = HelperService.getAssignedRecord();
            CourseFactory.getCourses().then(function (results) { 
                vm.heading = 'Add New subject';
                if (vm.subject) {
                    vm.isEdit = true;
                    vm.heading = 'Update subject';
                    vm.subject.class = vm.subject.class;
                    if (vm.subject)
                        vm.subject.date = new Date(vm.subject.date);
                }

                vm.courses = results;
            });

        }

        vm.create = function (subject) {

            vm.formSubmitted = true;

            if (vm.subjectForm.$valid) {

                subject.courseId = subject.course.id;
                SubjectFactory.createSubject(subject).then(function (result) {
                    if (result) {
                        $location.path('/subject');
                    }
                });               
            }
        }

        vm.update = function (subject) {
            vm.formSubmitted = true;

            if (vm.subjectForm.$valid) {
                subject.courseId = subject.course.id;
                SubjectFactory.editSubject(subject).then(function (result) {
                    if (result) {
                        $location.path('/subject');
                    }
                });
            }
        }

        vm.cancel = function () {
            $location.path('/subject');
        }
    }

    angular.module('EL').controller('SubjectAddEditController', SubjectAddEditController);
    SubjectAddEditController.$inject = ['$location', 'HelperService', 'SubjectFactory', 'CourseFactory'];
})();
