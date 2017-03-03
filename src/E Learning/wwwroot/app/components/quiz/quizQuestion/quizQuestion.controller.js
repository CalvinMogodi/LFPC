(function () {
    'use strict';

    function quizQuestionContorller($location, HelperService, QuizFactory, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.isEdit = false;
        vm.quizQuestions = [];
        vm.isStudent = false;
        vm.question = {
            answer: false
        };

        init();
        function init() {
            vm.quiz = HelperService.getAssignedRecord();
            QuizFactory.getQuizQuestionsByQuizId(vm.quiz.id).then(function (results) {
                vm.quizQuestions = results;

                if ($sessionStorage.userType == 'student') {
                    vm.isStudent = true;
                }
            });
        }

        vm.addQuestion = function (question) {

            vm.formSubmitted = true;

            if (vm.questionForm.$valid) {

                question.quizId = vm.quiz.id,
                QuizFactory.createQuizQuestion(question).then(function (result) {
                    if (result) {
                        vm.quizQuestions.push(question);
                        vm.question.description = undefined;
                        vm.question.type = undefined;
                        vm.question.answer = undefined;
                    }                    
                });              
            }
        }

        //vm.deleteQuestion = function (question) {
        //    alertDialogService.setHeaderAndMessage('Delete', 'Are you sure you want to delete this question?');
        //    var templateUrl = '/app/common/alert/alertDialog.template.html';
        //    modal.show(templateUrl, 'alertDialogController').then(function (result) {
        //        if (result) {
        //            vm.questions.$remove(question);
        //        }
        //    });
        //}

        vm.cancel = function () {
            $location.path('/subject');
        }

        vm.done = function (quizQuestionsAndAnswer) {
            var totalQuestions = quizQuestionsAndAnswer.length;
            var correctAnswers = 0;

            for (var i = 0; i < quizQuestionsAndAnswer.length; i++) {
                if (quizQuestionsAndAnswer[i].type == 'YesNo') {
                    if (quizQuestionsAndAnswer[i].studentAnswer == quizQuestionsAndAnswer[i].answer) {
                        correctAnswers++;
                    }
                }
                else {
                    if (quizQuestionsAndAnswer[i].studentAnswer.toLowerCase() == quizQuestionsAndAnswer[i].answer.toLowerCase()) {
                        correctAnswers++;
                    }
                }
                
            }

            var newRecord = {
                studentId: $sessionStorage.userId,
                score: correctAnswers + '/' + totalQuestions,
                quizId: vm.quiz.id,
            };
            QuizFactory.createQuizAnswer(newRecord).then(function (result) {
                    if (result) {
                        $location.path('/subject');
                    }
                });
        }
    }

    angular.module('EL').controller('quizQuestionContorller', quizQuestionContorller);
    quizQuestionContorller.$inject = ['$location', 'HelperService', 'QuizFactory', '$sessionStorage'];
})();
