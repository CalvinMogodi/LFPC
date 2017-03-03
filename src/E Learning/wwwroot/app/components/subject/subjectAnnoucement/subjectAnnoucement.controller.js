(function () {
    'use strict';

    function SubjectAnnoucementController($location, HelperService, AnnoucementFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Annoucement';
        vm.icon = "add_box";
        vm.classAnnoucements = [];
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            vm.subject = HelperService.getAssignedRecord();

            //load annoucements with class that is linked to
            AnnoucementFactory.getAnnoucementsBySubjectId(vm.subject.id).then(function (result) {
                vm.classAnnoucements = result;
            });           
        }
        vm.back = function () {
            $location.path('/subject');
        }

    }

    angular.module('EL').controller('SubjectAnnoucementController', SubjectAnnoucementController);
    SubjectAnnoucementController.$inject = ['$location', 'HelperService', 'AnnoucementFactory'];
})();
