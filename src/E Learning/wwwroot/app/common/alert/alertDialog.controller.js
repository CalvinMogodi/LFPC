(function () {
    'use strict';
    function alertDialogController($location, $scope, modal, alertDialogService) {
        init();

        function init() {
            $scope.header = alertDialogService.header;
            $scope.message = alertDialogService.message;
        }
        $scope.navigate = function () {
            modal.getResult(true);
        };

        $scope.cancel = function () {
            modal.hide();
        };
    }

    angular.module('EL').controller('alertDialogController', alertDialogController);
    alertDialogController.$inject = ['$location', '$scope', 'modal', 'alertDialogService'];

})();