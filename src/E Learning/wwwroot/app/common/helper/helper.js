(function () {
    'use strict';

    function HelperService(firebaseUrl, $firebaseArray) {

        var self = this;
        self.record;
        var ref = new Firebase(firebaseUrl);
        self.classes = $firebaseArray(ref.child('Class'));

        self.assignCurrentRecord = function (record) {
            self.record = record;
        }

        self.getAssignedRecord = function () {
            return self.record;
        }

        self.getRandomizeId = function () {
            var id = Math.floor(Math.random() * 999999) + 1;
            return id;
        }

        return self;
    }

    angular.module('EL').service('HelperService', HelperService);
    HelperService.$inject = ['firebaseUrl', '$firebaseArray'];

})();