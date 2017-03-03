(function () {
    'use strict';

    function ClassAddEditController($location, HelperService, ClassFactory) {
        /* jshint validthis:true */
        var vm = this;       
        vm.isEdit = false;

        init();
        function init() {
            vm.class = HelperService.getAssignedRecord();
            vm.heading = 'Add New Class';
            if (vm.class) {
                vm.isEdit = true;
                vm.heading = 'Update Class';
            }
                
        }

        vm.create = function (classOjb) {

            vm.formSubmitted = true;

            if (vm.classForm.$valid) {
                ClassFactory.createClass(classOjb).then(function (result) {
                    if (result) {
                        $location.path('/class');
                    }
                });
            }
        }

        vm.update = function (classOjb) {
            vm.formSubmitted = true;

            if (vm.classForm.$valid) {
                ClassFactory.editClass(classOjb).then(function (result) {
                    if (result) {
                        $location.path('/class');
                    }
                });
            }
        }

        vm.cancel = function () {
            $location.path('/class');
        }
    }

    angular.module('EL').controller('ClassAddEditController', ClassAddEditController);
    ClassAddEditController.$inject = ['$location', 'HelperService', 'ClassFactory'];
})();
