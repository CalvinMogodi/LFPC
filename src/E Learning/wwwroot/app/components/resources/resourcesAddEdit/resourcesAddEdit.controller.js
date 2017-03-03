(function () {
    'use strict';

    function ResourcesAddEditController($location, HelperService, ResourceFactory) {
        /* jshint validthis:true */
        var vm = this;

        init();
        function init() {
            vm.heading = 'Add New Resource';
        }

        vm.create = function (resource) {

            vm.formSubmitted = true;

            if (vm.resourceForm.$valid) {

                var f = document.getElementById('file').files[0];
                if (f != undefined) {
                    var r = new FileReader();
                    r.onloadend = function (e) {
                        var data = e.target.result;

                        var newRecord = {
                            title: resource.title,
                            file: data,
                        };
                        ResourceFactory.createResource(newRecord).then(function (result) {
                            if (result) {
                                $location.path('/resource');
                            }
                        });

                    }
                    r.readAsDataURL(f);
                } else {
                    //Please choose a file to upload
                }
            }
        }

        vm.cancel = function () {
            $location.path('/resource');
        }
    }

    angular.module('EL').controller('ResourcesAddEditController', ResourcesAddEditController);
    ResourcesAddEditController.$inject = ['$location', 'HelperService', 'ResourceFactory'];
})();
