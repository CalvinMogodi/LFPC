(function () {
    'use strict';

    function MessageFactory($http, $q, apiUrl) {

        var getMessagesByUserId = function (userId) {

            var defered = $q.defer();
            var getMessagesByUserIdComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'Message/GetMessagesByUserId?userId=' + userId).then(getMessagesByUserIdComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var getSentMessages = function (senderId) {

            var defered = $q.defer();
            var getSentMessagesComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'Message/GetSentMessages?senderId=' + senderId).then(getSentMessagesComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var editMessage = function (Message) {

            var defered = $q.defer();
            var editMessageComplete = function (response) {
                defered.resolve(response.data);
            }
            Message.user1 = undefined;
            Message.user = undefined;
            $http.put(apiUrl + 'Message/Edit', Message).then(editMessageComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var createMessage = function (Message) {

            var defered = $q.defer();
            var createMessageComplete = function (response) {
                defered.resolve(response.data);
            }
            Message.user1 = undefined;
            Message.user = undefined;
            $http.post(apiUrl + 'Message/Create', Message).then(createMessageComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var deleteMessage = function (MessageId) {

            var defered = $q.defer();
            var deleteMessageComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.delete(apiUrl + 'Message/Delete?id=' + MessageId).then(deleteMessageComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        return {
            getMessagesByUserId: getMessagesByUserId,
            getSentMessages: getSentMessages,
            editMessage: editMessage,
            createMessage: createMessage,
            deleteMessage: deleteMessage,
        }
    }

    angular.module('EL').factory('MessageFactory', MessageFactory);
    MessageFactory.$inject = ['$http', '$q', 'apiUrl'];
})();