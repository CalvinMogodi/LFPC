(function () {
    'use strict';

    function SubjectController($location, HelperService, alertDialogService, modal, $sessionStorage, SubjectFactory, StudentSubjectFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Subject';
        vm.icon = "add_box";
        vm.isStudent = false;
        vm.showAddButton = true;
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            if ($sessionStorage.userType == 'student') {
                vm.showAddButton = false;
                vm.isStudent = true;
                vm.subjects = [];
                StudentSubjectFactory.getByStudentId($sessionStorage.userId).then(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        vm.subjects.push(results[i].subject);
                    }
                });
            } else {
                //load subjects with course that is linked to
                SubjectFactory.getSubjects().then(function (results) {
                    vm.subjects = results;
                });
            }
        }

        vm.newSubject = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/subjectAddEdit');
        }
        vm.editSubject = function (subject) {
            HelperService.assignCurrentRecord(subject);
            $location.path('/subjectAddEdit');
        }
        vm.deleteSubjest = function (subject, index) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sure you want to delete this subject?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    SubjectFactory.deleteSubject(subject.id).then(function (results) {
                        if (results) {
                            vm.subjects.splice(index, 1);
                        }
                    });
                }
            });
        }

        vm.viewQuizzess = function (subject) {
            HelperService.assignCurrentRecord(subject);
            $location.path('/subjectQuiz');
        }

        vm.viewAnnoucements = function (subject) {
            HelperService.assignCurrentRecord(subject);
            $location.path('/subjectAnnoucement');
        }

        vm.viewAssignments = function (classOjb) {
            HelperService.assignCurrentRecord(classOjb);
            $location.path('/subjectAssignment');
        }
    }

    angular.module('EL').controller('SubjectController', SubjectController);
    SubjectController.$inject = ['$location', 'HelperService', 'alertDialogService', 'modal', '$sessionStorage', 'SubjectFactory', 'StudentSubjectFactory'];
})();
