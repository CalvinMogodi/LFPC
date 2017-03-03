(function () {
    'use strict'; 

    function ChatRoomController($location, $firebaseArray, $sessionStorage, firebaseUrl) {
        /* jshint validthis:true */
        var vm = this;
        vm.haeading = 'Chat';
        var ref = new Firebase(firebaseUrl + "/Chat");
        init();

        function timeNow(i) {
            var d = new Date(),
                h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
                m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
            i.value = h + ':' + m;
        }

        var d = new Date(); // for now
        var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); // => 51

        function init() {
            vm.chats = $firebaseArray(ref);
        }

        vm.addMessage = function (message) {
            vm.chats.$add({
                text: message,
                TimeSubmitted: time,
                user: $sessionStorage.displayName,
            });

            vm.chat = undefined;
        };

    }

    angular.module('EL').controller('ChatRoomController', ChatRoomController);
    ChatRoomController.$inject = ['$location', '$firebaseArray', '$sessionStorage', 'firebaseUrl'];
})();
