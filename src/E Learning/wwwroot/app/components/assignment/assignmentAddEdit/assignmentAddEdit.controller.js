(function () {
    'use strict';

    function AssignmentAddEditController($location, HelperService, AssignmentFactory, $sessionStorage, SubjectFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.isEdit = false;

        init();
        function init() {
            vm.assignment = HelperService.getAssignedRecord();
            SubjectFactory.getSubjects().then(function (results) {
                vm.heading = 'Add New Assignment';
                if (vm.assignment) {
                    vm.isEdit = true;
                    vm.heading = 'Update Assignment';
                }

                vm.subjects = results;
            });


        }

        vm.create = function (assignment) {

            vm.formSubmitted = true;

            if (vm.assignmentForm.$valid) {

                var f = document.getElementById('file').files[0];
                if (f != undefined) {
                    var r = new FileReader();
                    r.onloadend = function (e) {
                        var data = e.target.result;
                        //send your binary data via $http or $resource or do anything else with it
                        //var obj = JSON.parse();
                        assignment.subjectId = assignment.subject.id;
                        assignment.lecturerId = $sessionStorage.userId;
                        assignment.file = data;

                        AssignmentFactory.createAssignment(assignment).then(function (result) {
                            if (result) {
                                $location.path('/assignment');
                            }
                        });
                    }
                    r.readAsDataURL(f);
                } else {
                    //Please choose a file to upload
                }
            }
        }

        vm.update = function (assignment) {
            vm.formSubmitted = true;
            if (vm.assignmentForm.$valid) {

                var f = document.getElementById('file').files[0];
                if (f != undefined) {
                    var r = new FileReader();
                    r.onloadend = function (e) {
                        var data = e.target.result;

                        assignment.subjectId = assignment.subject.id;
                        assignment.file = data;

                        AssignmentFactory.editAssignment(assignment).then(function (result) {
                            if (result) {
                                $location.path('/assignment');
                            }
                        });

                    }
                    r.readAsDataURL(f);
                }
                else {
                    assignment.subjectId = assignment.subject.id;
                    AssignmentFactory.editAssignment(assignment).then(function (result) {
                        if (result) {
                            $location.path('/assignment');
                        }
                    });
                }
            }
        }

        vm.cancel = function () {
            $location.path('/assignment');
        }
    }

    angular.module('EL').controller('AssignmentAddEditController', AssignmentAddEditController);
    AssignmentAddEditController.$inject = ['$location', 'HelperService', 'AssignmentFactory', '$sessionStorage', 'SubjectFactory'];
})();
