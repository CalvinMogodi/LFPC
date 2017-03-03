(function () {
    'use strict';

    function AssignmentFactory($http, $q, apiUrl) {
        
        var getAssignments = function () {

            var defered = $q.defer();
            var getAssignmentsComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'Assignment/GetAssignments').then(getAssignmentsComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var getAssignmentsBySubjectId = function (subjectId) {

            var defered = $q.defer();
            var getAssignmentsBySubjectIdComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'Assignment/GetAssignmentsBySubjectId?subjectId=' + subjectId).then(getAssignmentsBySubjectIdComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        } 

        var getUploadedAssignmentsByAssignmentId = function (assignmentId) {

            var defered = $q.defer();
            var getUploadedAssignmentsByAssignmentIdComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'UploadedAssignment/GetUploadedAssignmentsByAssignmentId?assignmentId=' + assignmentId).then(getUploadedAssignmentsByAssignmentIdComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var uploadAssignment = function (Assignment) {

            var defered = $q.defer();
            var uploadAssignmentComplete = function (response) {
                defered.resolve(response.data);
            }
            Assignment.subject = undefined;
            $http.post(apiUrl + 'UploadedAssignment/Create', Assignment).then(uploadAssignmentComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var editAssignment = function (Assignment) {

            var defered = $q.defer();
            var editAssignmentComplete = function (response) {
                defered.resolve(response.data);
            }

            Assignment.subject = undefined;
            Assignment.user = undefined;
            $http.put(apiUrl + 'Assignment/Edit', Assignment).then(editAssignmentComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var createAssignment = function (Assignment) {

            var defered = $q.defer();
            var createAssignmentComplete = function (response) {
                defered.resolve(response.data);
            }
            Assignment.subject = undefined;
            $http.post(apiUrl + 'Assignment/Create', Assignment).then(createAssignmentComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var deleteAssignment = function (AssignmentId) {

            var defered = $q.defer();
            var deleteAssignmentComplete = function (response) {
                defered.resolve(response.data);
            }
            
            $http.delete(apiUrl + 'Assignment/Delete?id=' + AssignmentId).then(deleteAssignmentComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        return {
            getAssignments: getAssignments,
            editAssignment: editAssignment,
            createAssignment: createAssignment,
            deleteAssignment: deleteAssignment,
            getAssignmentsBySubjectId: getAssignmentsBySubjectId,
            uploadAssignment: uploadAssignment,
            getUploadedAssignmentsByAssignmentId: getUploadedAssignmentsByAssignmentId,
        }
    }

    angular.module('EL').factory('AssignmentFactory', AssignmentFactory);
    AssignmentFactory.$inject = ['$http', '$q', 'apiUrl'];
})();