(function () {
    'use strict';

    function UserController($location, HelperService, alertDialogService, modal, UserFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'user';
        vm.icon = "add_box";
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            UserFactory.getUsers().then(function (data) {
                vm.users = data;
                vm.masterUsers = angular.copy(vm.users);
            });
        }

        vm.newUser = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/userAddEdit');
        }
        vm.editUser = function (user) {
            HelperService.assignCurrentRecord(user);
            $location.path('/userAddEdit');
        }
        vm.deleteUser = function (user, index) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sure you want to delete this user?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    UserFactory.deleteUser(user.id).then(function (results) {
                        if (results) {
                            vm.users.splice(index, 1);
                        }
                    });
                    
                }
            });
        }
        vm.filter = function (filter) {
            var list = angular.copy(vm.masterUsers);
            var results = [];
            if (filter.userType){
                for (var i = 0; i < list.length; i++) {
                    if (filter.userType.toLowerCase() == list[i].userType.toLowerCase()) {
                        results.push(list[i]);
                    }
                }
            }
            vm.users = results;
        }
        vm.clear = function () {
            vm.filter.userType = undefined;
            vm.users = angular.copy(vm.masterUsers);
        }
    }

    angular.module('EL').controller('UserController', UserController);
    UserController.$inject = ['$location', 'HelperService', 'alertDialogService', 'modal', 'UserFactory'];
})();
