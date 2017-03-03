(function () {
    'use strict';

    function SubjectFactory($http, $q, apiUrl) {

        var getSubjects = function () {

            var defered = $q.defer();
            var getSubjectsComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'Subject/Get').then(getSubjectsComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var createSubject = function (subject) {
            subject.course = undefined;
            var defered = $q.defer();
            var createSubjectComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(apiUrl + 'Subject/Create', subject).then(createSubjectComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var getSubjectsByCourseId = function (courseId) {

            var defered = $q.defer();
            var getSubjectsByCourseIdComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'Subject/getSubjectsByCourseId?courseId=' + courseId).then(getSubjectsByCourseIdComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var editSubject = function (subject) {

            var defered = $q.defer();
            var editSubjectComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.put(apiUrl + 'Subject/Edit', subject).then(editSubjectComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var deleteSubject = function (subjectId) {

            var defered = $q.defer();
            var deleteSubjectComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.delete(apiUrl + 'Subject/Delete?id='+ subjectId).then(deleteSubjectComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        return {
            getSubjects: getSubjects,
            getSubjectsByCourseId: getSubjectsByCourseId,
            createSubject: createSubject,
            editSubject: editSubject,
            deleteSubject: deleteSubject,
        }
    }

    angular.module('EL').factory('SubjectFactory', SubjectFactory);
    SubjectFactory.$inject = ['$http', '$q', 'apiUrl'];
})();