(function () {
    'use strict';

    function AnnoucementFactory($http, $q, apiUrl) {

        var getAnnoucements = function () {

            var defered = $q.defer();
            var getAnnoucementsComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'Annoucement/GetAnnoucements').then(getAnnoucementsComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        } 

        var getAnnoucementsBySubjectId = function (subjectId) {

            var defered = $q.defer();
            var getAnnoucementsBySubjectIdComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'Annoucement/GetAnnoucementsBySubjectId?subjectId=' + subjectId).then(getAnnoucementsBySubjectIdComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var editAnnoucement = function (annoucement) {

            var defered = $q.defer();
            var editAnnoucementComplete = function (response) {
                defered.resolve(response.data);
            }

            annoucement.subject = undefined;
            annoucement.user = undefined;
            $http.put(apiUrl + 'Annoucement/Edit', annoucement).then(editAnnoucementComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var createAnnoucement = function (annoucement) {

            var defered = $q.defer();
            var createAnnoucementComplete = function (response) {
                defered.resolve(response.data);
            }
            annoucement.subject = undefined;
            $http.post(apiUrl + 'Annoucement/Create', annoucement).then(createAnnoucementComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var deleteAnnoucement = function (AnnoucementId) {

            var defered = $q.defer();
            var deleteAnnoucementComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.delete(apiUrl + 'Annoucement/Delete?id=' + AnnoucementId).then(deleteAnnoucementComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        return {
            getAnnoucements: getAnnoucements,
            editAnnoucement: editAnnoucement,
            createAnnoucement: createAnnoucement,
            deleteAnnoucement: deleteAnnoucement,
            getAnnoucementsBySubjectId: getAnnoucementsBySubjectId,
        }
    }

    angular.module('EL').factory('AnnoucementFactory', AnnoucementFactory);
    AnnoucementFactory.$inject = ['$http', '$q', 'apiUrl'];
})();