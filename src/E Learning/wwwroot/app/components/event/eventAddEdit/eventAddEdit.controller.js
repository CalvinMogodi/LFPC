(function () {
    'use strict'; 

    function EventAddEditController($location, firebaseUrl, HelperService, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.isEdit = false;

        init();
        function init() {
            vm.event = HelperService.getAssignedRecord();
            vm.classes = $firebaseArray(ref.child('Class'));
            vm.heading = 'Add New event';
            if (vm.event) {
                vm.isEdit = true;
                vm.heading = 'Update event';
                vm.event.class = vm.event.class;
                if (vm.event){
                    vm.event.startDate = new Date(vm.event.startDate);
                    vm.event.endDate = new Date(vm.event.endDate);
                }
            }

        }

        vm.create = function (event) {

            vm.formSubmitted = true;

            if (vm.eventForm.$valid) {
                var eventRef = new Firebase(firebaseUrl + "/Event");
                var events = $firebaseArray(eventRef);

                event.startDate = $filter('date')(new Date(event.startDate), 'yyyy-MM-dd');
                event.endDate = $filter('date')(new Date(event.endDate), 'yyyy-MM-dd');
                var newRecord = {
                    title: event.title,
                    description: event.description,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    classId: event.class.$id,
                };
                events.$add(newRecord);
                $location.path('/event');
            }
        }

        vm.update = function (event) {
            vm.formSubmitted = true;

            if (vm.eventForm.$valid) {
                var editRef = new Firebase(firebaseUrl + "/Event/" + event.$id);
                event.startDate = $filter('date')(new Date(event.startDate), 'yyyy-MM-dd');
                event.endDate = $filter('date')(new Date(event.endDate), 'yyyy-MM-dd');
                var oldEvent = $firebaseObject(editRef);

                oldEvent.$id = event.$id;
                oldEvent.description = event.description;
                oldEvent.title = event.title;
                oldEvent.startDate = event.startDate;
                oldEvent.endDate = event.endDate;
                oldEvent.classId = event.class.$id;

                oldEvent.$save();
                $location.path('/event');
            }
        }

        vm.cancel = function () {
            $location.path('/event');
        }
    }

    angular.module('EL').controller('EventAddEditController', EventAddEditController);
    EventAddEditController.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', '$filter', '$firebaseObject'];
})();
