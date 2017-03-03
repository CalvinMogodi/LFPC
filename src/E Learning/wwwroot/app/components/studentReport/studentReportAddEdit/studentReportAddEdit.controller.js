(function () {
    'use strict';

    function StudentReportAddEditController($location, HelperService, SubjectFactory, StudentSubjectFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Link Student To Course';

        init();
        function init() {
            vm.student = HelperService.getAssignedRecord();
            SubjectFactory.getSubjectsByCourseId(vm.student.courseId).then(function (results) {
                vm.subjectsToLink = results;
            });

        }

        vm.cancel = function () {
            $location.path('/studentsReport');
        }
        
        vm.linkSubjects = function (subjects) {
            for (var i = 0; i < subjects.length; i++) {
                if (subjects[i].isActive) {
                    
                    var StudentSubject = {
                        subjectId: subjects[i].id,
                        studentId: vm.student.id,
                    };
                    StudentSubjectFactory.createStudentSubject(StudentSubject).then(function (result) {
                        if (result) {

                        }
                    });
                }                
            }
            $location.path('/studentsReport');
        }

    }

    angular.module('EL').controller('StudentReportAddEditController', StudentReportAddEditController);
    StudentReportAddEditController.$inject = ['$location', 'HelperService', 'SubjectFactory', 'StudentSubjectFactory'];
})();
