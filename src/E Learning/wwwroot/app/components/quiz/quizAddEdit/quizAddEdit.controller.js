(function () {
    'use strict';

    function QuizAddEditController($location, HelperService, QuizFactory, SubjectFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.isEdit = false;

        init();
        function init() {
            vm.quiz = HelperService.getAssignedRecord();
             SubjectFactory.getSubjects().then(function (results) {
                 vm.subjects = results;
                vm.heading = 'Add New Quiz';
                if (vm.quiz) {
                    vm.isEdit = true;
                    vm.heading = 'Update Quiz';
                    vm.quiz.class = vm.quiz.class;
                }
            });

        }

        vm.create = function (quiz) {

            vm.formSubmitted = true;

            if (vm.quizForm.$valid) {

                quiz.subjectId = quiz.subject.id;

                QuizFactory.createQuiz(quiz).then(function (result) {
                    if (result) {
                        $location.path('/quiz');
                    }
                });
            }
        }

        vm.update = function (quiz) {
            vm.formSubmitted = true;

            if (vm.quizForm.$valid) {
                quiz.subjectId = quiz.subject.id;

                QuizFactory.editQuiz(quiz).then(function (result) {
                    if (result) {
                        $location.path('/quiz');
                    }
                });
            }
        }

        vm.cancel = function () {
            $location.path('/quiz');
        }
    }

    angular.module('EL').controller('QuizAddEditController', QuizAddEditController);
    QuizAddEditController.$inject = ['$location', 'HelperService', 'QuizFactory', 'SubjectFactory'];
})();
