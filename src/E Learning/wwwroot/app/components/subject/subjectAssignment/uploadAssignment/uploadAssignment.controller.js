(function () {
    'use strict';

    function UploadAssignmentController($location, $sessionStorage, HelperService, AssignmentFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Upload Assignment';
        vm.icon = "add_box";
        init();

        function init() {
            vm.assignment = HelperService.getAssignedRecord();
        }


        vm.upload = function () {
            var f = document.getElementById('file').files[0];
            if (f != undefined) {
                var r = new FileReader();
                r.onloadend = function (e) {
                    var data = e.target.result;
                    var newRecord = {
                        assignmentId: vm.assignment.id,
                        studentId: $sessionStorage.userId,
                        file: data,
                    };
                    AssignmentFactory.uploadAssignment(newRecord).then(function (result) {                    
                        $location.path('/subject');
                    });
                }
                r.readAsDataURL(f);
            } else {
                //Please choose a file to upload
            }
        }

        vm.cancel = function () {
            $location.path('/subject');
        }

    }

    angular.module('EL').controller('UploadAssignmentController', UploadAssignmentController);
    UploadAssignmentController.$inject = ['$location', '$sessionStorage', 'HelperService', 'AssignmentFactory'];
})();
