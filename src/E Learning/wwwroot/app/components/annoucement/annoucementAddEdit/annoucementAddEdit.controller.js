(function () {
    'use strict';

    function AnnoucementAddEditController($location, HelperService, AnnoucementFactory, $sessionStorage, SubjectFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.isEdit = false;

        init();
        function init() {
            vm.annoucement = HelperService.getAssignedRecord();
            SubjectFactory.getSubjects().then(function (results) {
                vm.subjects = results;
                     vm.heading = 'Add New Annoucement';
                     if (vm.annoucement) {
                         vm.isEdit = true;
                         vm.heading = 'Update Annoucement';
                     }
                 });
        }

        vm.create = function (annoucement) {

            vm.formSubmitted = true;

            if (vm.annoucementForm.$valid) {
                
                annoucement.subjectId = annoucement.subject.id;
                annoucement.lecturerId = $sessionStorage.userId;

                AnnoucementFactory.createAnnoucement(annoucement).then(function (result) {
                    if (result) {
                        $location.path('/annoucement');
                    }
                });
            }
        }

        vm.update = function (annoucement) {
            vm.formSubmitted = true;

            if (vm.annoucementForm.$valid) {

                annoucement.subjectId = annoucement.subject.id;

                AnnoucementFactory.editAnnoucement(annoucement).then(function (result) {
                    if (result) {
                        $location.path('/annoucement');
                    }
                });
            }
        }

        vm.cancel = function () {
            $location.path('/annoucement');
        }
    }

    angular.module('EL').controller('AnnoucementAddEditController', AnnoucementAddEditController);
    AnnoucementAddEditController.$inject = ['$location', 'HelperService', 'AnnoucementFactory', '$sessionStorage', 'SubjectFactory'];
})();
