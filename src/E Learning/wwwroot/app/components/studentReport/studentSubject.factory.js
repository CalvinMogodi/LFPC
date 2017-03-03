(function () {
    'use strict';

    function StudentSubjectFactory($http, $q, apiUrl) {

        var createStudentSubject = function (studentSubject) {

            var defered = $q.defer();
            var createStudentSubjectComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(apiUrl + 'StudentSubject/Create', studentSubject).then(createStudentSubjectComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var getByStudentId = function (studentId) {

            var defered = $q.defer();
            var getByStudentIdComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'StudentSubject/GetByStudentId?studentId=' + studentId).then(getByStudentIdComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        return {
            createStudentSubject: createStudentSubject,
            getByStudentId: getByStudentId,
        }
    }

    angular.module('EL').factory('StudentSubjectFactory', StudentSubjectFactory);
    StudentSubjectFactory.$inject = ['$http', '$q', 'apiUrl'];
})();