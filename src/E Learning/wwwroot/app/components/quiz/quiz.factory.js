(function () {
    'use strict';

    function QuizFactory($http, $q, apiUrl) {
        var getQuizs = function () {

            var defered = $q.defer();
            var getQuizsComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'Quiz/GetQuizes').then(getQuizsComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var getQuizQuestionsByQuizId = function (quizId) {

            var defered = $q.defer();
            var getQuizQuestionsByQuizIdComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'QuizQuestion/GetQuizQuestionsByQuizId?quizId=' + quizId).then(getQuizQuestionsByQuizIdComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var getQuizesBySubjectId = function (subjectId) {

            var defered = $q.defer();
            var getQuizesBySubjectIdComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'Quiz/GetQuizesBySubjectId?subjectId=' + subjectId).then(getQuizesBySubjectIdComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }
        var getQuizAnswersByQuizId = function (quizId) {

            var defered = $q.defer();
            var getQuizAnswersByQuizId = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'QuizAnswer/GetQuizAnswersByQuizId?quizId=' + quizId).then(getQuizAnswersByQuizId, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var editQuiz = function (Quiz) {

            var defered = $q.defer();
            var editQuizComplete = function (response) {
                defered.resolve(response.data);
            }

            Quiz.subject = undefined;
            $http.put(apiUrl + 'Quiz/Edit', Quiz).then(editQuizComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var createQuiz = function (Quiz) {

            var defered = $q.defer();
            var createQuizComplete = function (response) {
                defered.resolve(response.data);
            }

            Quiz.subject = undefined;
            $http.post(apiUrl + 'Quiz/Create', Quiz).then(createQuizComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var createQuizQuestion = function (quizQuestion) {

            var defered = $q.defer();
            var createQuizQuestionComplete = function (response) {
                defered.resolve(response.data);
            }

            quizQuestion.quiz = undefined;
            $http.post(apiUrl + 'QuizQuestion/Create', quizQuestion).then(createQuizQuestionComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var createQuizAnswer = function (quizAnswer) {

            var defered = $q.defer();
            var createQuizAnswerComplete = function (response) {
                defered.resolve(response.data);
            }

            quizAnswer.quiz = undefined;
            $http.post(apiUrl + 'QuizAnswer/Create', quizAnswer).then(createQuizAnswerComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var deleteQuiz = function (QuizId) {

            var defered = $q.defer();
            var deleteQuizComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.delete(apiUrl + 'Quiz/Delete?id=' + QuizId).then(deleteQuizComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        return {
            getQuizs: getQuizs,
            editQuiz: editQuiz,
            createQuiz: createQuiz,
            deleteQuiz: deleteQuiz,
            getQuizQuestionsByQuizId: getQuizQuestionsByQuizId,
            createQuizQuestion: createQuizQuestion,
            createQuizAnswer: createQuizAnswer,
            getQuizAnswersByQuizId: getQuizAnswersByQuizId,
            getQuizesBySubjectId: getQuizesBySubjectId,
        }
    }

    angular.module('EL').factory('QuizFactory', QuizFactory);
    QuizFactory.$inject = ['$http', '$q', 'apiUrl'];
})();