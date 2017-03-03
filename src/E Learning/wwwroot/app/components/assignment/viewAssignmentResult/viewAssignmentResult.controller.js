(function () {
    'use strict';

    function ViewAssignmentResultController($location, HelperService, AssignmentFactory, $sessionStorage) {
        var vm = this;
        vm.results = [];
        vm.heading = 'Assignment Results';
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();
        function init() {
            vm.assignment = HelperService.getAssignedRecord();
            
            AssignmentFactory.getUploadedAssignmentsByAssignmentId(vm.assignment.id).then(function (result) {
                vm.results = result;
            });
        }

        vm.back = function () {
            $location.path('/assignment');
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

    angular.module('EL').controller('ViewAssignmentResultController', ViewAssignmentResultController);
    ViewAssignmentResultController.$inject = ['$location', 'HelperService', 'AssignmentFactory', '$sessionStorage'];
})();
