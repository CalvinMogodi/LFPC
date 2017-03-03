(function () {
    'use strict';

    function SubjectAssignmentController($location, HelperService, AssignmentFactory, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Class Assignment';
        vm.icon = "add_box";
        vm.classAssignments = [];
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            vm.subject = HelperService.getAssignedRecord();
            //load assignments with class that is linked to

            AssignmentFactory.getAssignmentsBySubjectId(vm.subject.id).then(function (results) {
                for (var i = 0; i < results.length; i++) {
                    if (results[i].uploadedAssignments.length > 0) {
                        results[i].showUpload = true;
                    }
                    vm.classAssignments.push(results[i]);
                }
            });
        }
        vm.back = function () {
            $location.path('/subject');
        }

        vm.uploadAssignment = function (assignment) {
            HelperService.assignCurrentRecord(assignment);
            $location.path('/uploadAssignment');
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
    }

    angular.module('EL').controller('SubjectAssignmentController', SubjectAssignmentController);
    SubjectAssignmentController.$inject = ['$location', 'HelperService', 'AssignmentFactory', '$sessionStorage'];
})();
