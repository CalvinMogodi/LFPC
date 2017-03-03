(function () {
    'use strict';

    function QuizController($location, HelperService, alertDialogService, modal, QuizFactory, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Quiz';
        vm.icon = "add_box";
        vm.isStudent = false;
        vm.showAddButton = true;
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            if ($sessionStorage.userType == 'student') {
                vm.showAddButton = false;
                vm.isStudent = true;
            }
            //load quiz
            QuizFactory.getQuizs().then(function (data) {
                vm.quizzes = data;
            });
        }

        vm.newQuiz = function () {
            HelperService.assignCurrentRecord(undefined);
            $location.path('/quizAddEdit');
        }
        vm.editQuiz = function (quiz) {
            HelperService.assignCurrentRecord(quiz);
            $location.path('/quizAddEdit');
        }
        
        vm.viewResult = function (quiz) {
            HelperService.assignCurrentRecord(quiz);
            $location.path('/quizResult');
        }
        vm.addQuestion = function (quiz) {
            HelperService.assignCurrentRecord(quiz);
            $location.path('/quizQuestion');
        }
        vm.deleteQuiz = function (quiz, index) {
            alertDialogService.setHeaderAndMessage('Delete', 'Are you sure you want to delete this quiz?');
            var templateUrl = '/app/common/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController').then(function (result) {
                if (result) {
                    QuizFactory.deleteQuiz(quiz.id).then(function (results) {
                        if (results) {
                            vm.quizzes.splice(index, 1);
                        }
                    });
                }
            });
        }
    }

    angular.module('EL').controller('QuizController', QuizController);
    QuizController.$inject = ['$location', 'HelperService', 'alertDialogService', 'modal', 'QuizFactory', '$sessionStorage'];
})();
