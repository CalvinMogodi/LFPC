(function () {
    'use strict';

    function AnnoucementController($location, HelperService, alertDialogService, modal, AnnoucementFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Annoucement';
        vm.icon = "add_box";
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            //load annoucements with class that is linked to
            AnnoucementFactory.getAnnoucements().then(function (data) {
                vm.annoucements = data;
            });            
        }

        vm.newAnnoucement = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/annoucementAddEdit');
        }
        vm.editAnnoucement = function (annoucement) {
            HelperService.assignCurrentRecord(annoucement);
            $location.path('/annoucementAddEdit');
        }
        vm.deleteAnnoucement = function (annoucement, index) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sure you want to delete this class?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    AnnoucementFactory.deleteAnnoucement(annoucement.id).then(function (results) {
                        if (results) {
                            vm.annoucements.splice(index, 1);
                        }
                    });
                }
            });
        }
    }

    angular.module('EL').controller('AnnoucementController', AnnoucementController);
    AnnoucementController.$inject = ['$location','HelperService', 'alertDialogService', 'modal', 'AnnoucementFactory'];
})();
