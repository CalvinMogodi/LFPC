(function () {
    'use strict';

    function AssignmentController($location, HelperService, alertDialogService, modal, AssignmentFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Assignment';
        vm.icon = "add_box";
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            //load assignments with subject that is linked to
            AssignmentFactory.getAssignments().then(function (data) {
                vm.assignments = data;
            });

        }

        vm.newAssignment = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/assignmentAddEdit');
        }
        vm.editAssignment = function (assignment) {
            HelperService.assignCurrentRecord(assignment);
            $location.path('/assignmentAddEdit');
        }

        vm.downloadAssignment = function (assignment) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", assignment.file);
            xhr.responseType = "arraybuffer";

            xhr.onload = function () {
                if (this.status === 200) {
                    var blob = new Blob([xhr.response], { type: "application/pdf" });
                    var objectUrl = URL.createObjectURL(blob);
                    window.open(objectUrl);
                }
            };
            xhr.send();
        }

        vm.deleteAssignment = function (assignment, index) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sure you want to delete this class?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    AssignmentFactory.deleteAssignment(assignment.id).then(function (results) {
                        if (results) {
                            vm.assignments.splice(index, 1);
                        }
                    });
                }
            });
        }

        vm.viewResults = function (assignment) {
            HelperService.assignCurrentRecord(assignment);
            $location.path('/viewAssignmentResult');
        }
    }

    angular.module('EL').controller('AssignmentController', AssignmentController);
    AssignmentController.$inject = ['$location','HelperService', 'alertDialogService', 'modal', 'AssignmentFactory'];
})();
