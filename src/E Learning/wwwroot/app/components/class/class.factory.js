(function () {
    'use strict';

    function ClassFactory($http, $q, apiUrl) {

        var getClasses = function () {

            var defered = $q.defer();
            var getClassesComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'Class/GetClasses').then(getClassesComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var createClass = function (classObj) {

            var defered = $q.defer();
            var createClassComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(apiUrl + 'Class/Create', classObj).then(createClassComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var editClass = function (classObj) {

            var defered = $q.defer();
            var editClassComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.put(apiUrl + 'Class/Edit', classObj).then(editClassComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var deleteClass = function (classId) {

            var defered = $q.defer();
            var deleteClassComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.delete(apiUrl + 'Class/Delete?id=' + classId).then(deleteClassComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        return {
            getClasses: getClasses,
            createClass: createClass,
            editClass: editClass,
            deleteClass: deleteClass,
        }
    }

    angular.module('EL').factory('ClassFactory', ClassFactory);
    ClassFactory.$inject = ['$http', '$q', 'apiUrl'];
})();