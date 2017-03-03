(function () {
    'use strict';

    function StudentReportController($location, HelperService, alertDialogService, modal, UserFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Student';
        vm.icon = "add_box";
        vm.students = [];
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            //load students with class that is linked to
            UserFactory.getStudents().then(function (results) {
                vm.students = results;
            });
        }

        vm.editStudentRecord = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/studentAddEdit');
        }
        vm.addSubjects = function (student) {
            HelperService.assignCurrentRecord(student);
            $location.path('/studentAddEdit');
        }

        vm.newStudent = function () {
            $location.path('/userAddEdit');
        }
    }

    angular.module('EL').controller('StudentReportController', StudentReportController);
    StudentReportController.$inject = ['$location', 'HelperService', 'alertDialogService', 'modal', 'UserFactory'];
})();
