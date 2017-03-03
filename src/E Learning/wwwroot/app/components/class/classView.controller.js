(function () {
    'use strict';

    function ClassController($location, ClassFactory, HelperService, alertDialogService, modal, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Class';
        vm.icon = "add_box";
        vm.isStudent = false;
        vm.showAddButton = true;
        vm.pagenation = {
            limit: 5,
            page:1,
        };

        init();

        function init() {
            ClassFactory.getClasses().then(function (results) {
                vm.classes = results;
            });
            if ($sessionStorage.userType == 'student') {
                vm.isStudent = true;
                vm.showAddButton = false;
            }            
        }

        vm.newClass = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/classAddEdit');
        }
        vm.editClass = function (classOjb) {
            HelperService.assignCurrentRecord(classOjb);
            $location.path('/classAddEdit');
        }
        vm.deleteClass = function (classOjb, index) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sure you want to delete this class?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    ClassFactory.deleteClass(classOjb.id).then(function (results) {
                        if (results) {
                            vm.classes.splice(index, 1);
                        }
                    });
                }
            });
        }

       
    }

    angular.module('EL').controller('ClassController', ClassController);
    ClassController.$inject = ['$location', 'ClassFactory', 'HelperService', 'alertDialogService', 'modal', '$sessionStorage'];
})();
