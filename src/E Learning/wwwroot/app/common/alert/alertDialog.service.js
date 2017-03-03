(function () {
    'use strict';
    function alertDialogService() {
        var self = this;
        self.path = [];
        self.header = undefined;
        self.message = undefined;


        self.getPath = function () {
            return self.path;
        }
        self.getMessage = function () {
            return self.message;
        }
        self.getHeader = function () {
            return self.header;
        }

        self.setPath = function (path) {
            self.path = path;
        }

        self.setHeaderAndMessage = function (header, message) {
            self.header = header;
            self.message = message;
        }

    }

    angular.module('EL').service('alertDialogService', alertDialogService);
    alertDialogService.$inject = [];
})();