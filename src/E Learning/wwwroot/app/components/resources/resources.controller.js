(function () {
    'use strict';

    function ResourcesController($location, HelperService, alertDialogService, modal, ResourceFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Resource';
        vm.icon = "add_box";
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            ResourceFactory.getResources().then(function (results) {
                vm.resources = results;
            });
        }

        vm.newResource = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/resourceAddEdit');
        }
      

        vm.downloadResource = function (resource) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", resource.file);
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

        vm.deleteResource = function (resource, index) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sure you want to delete this resource?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    ResourceFactory.deleteResource(resource.id).then(function (results) {
                        if (results) {
                            vm.resources.splice(index, 1);
                        }
                    });
                }
            });
        }
    }

    angular.module('EL').controller('ResourcesController', ResourcesController);
    ResourcesController.$inject = ['$location', 'HelperService', 'alertDialogService', 'modal', 'ResourceFactory'];
})();
