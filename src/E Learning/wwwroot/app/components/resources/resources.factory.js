(function () {
    'use strict';

    function ResourceFactory($http, $q, apiUrl) {
        
        var getResources = function () {

            var defered = $q.defer();
            var getResourcesComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'Resource/GetResources').then(getResourcesComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var createResource = function (resource) {

            var defered = $q.defer();
            var createResourceComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(apiUrl + 'Resource/Create', resource).then(createResourceComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var editResource = function (resource) {

            var defered = $q.defer();
            var editResourceComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.put(apiUrl + 'Resource/Edit', resource).then(editResourceComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var deleteResource = function (resourceId) {

            var defered = $q.defer();
            var deleteResourceComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.delete(apiUrl + 'Resource/Delete?id=' + resourceId).then(deleteResourceComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        return {
            getResources: getResources,
            createResource: createResource,
            editResource: editResource,
            deleteResource: deleteResource,
        }
    }

    angular.module('EL').factory('ResourceFactory', ResourceFactory);
    ResourceFactory.$inject = ['$http', '$q', 'apiUrl'];
})();