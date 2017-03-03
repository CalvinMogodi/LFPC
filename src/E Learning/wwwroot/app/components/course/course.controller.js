(function () {
    'use strict';

    function CourseController($location, HelperService, alertDialogService, modal, CourseFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Course';
        vm.icon = "add_box";
        vm.isStudent = false;
        vm.showAddButton = true;
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            //load courses
            CourseFactory.getCourses().then(function (data) {
                vm.courses = data;
            });
        }

        vm.newCourse = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/courseAddEdit');
        }
        vm.editCourse = function (course) {
            HelperService.assignCurrentRecord(course);
            $location.path('/courseAddEdit');
        }
        vm.deleteCourse = function (course, index) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sure you want to delete this course?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    CourseFactory.deleteCourse(course.id).then(function (results) {
                        if (results) {
                            vm.courses.splice(index, 1);
                        }
                    });
                }
            });
        }

        vm.viewSubjects = function (course) {
            HelperService.assignCurrentRecord(course);
            $location.path('/subject');
        }
    }

    angular.module('EL').controller('CourseController', CourseController);
    CourseController.$inject = ['$location', 'HelperService', 'alertDialogService', 'modal', 'CourseFactory'];
})();
