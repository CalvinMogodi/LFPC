(function () {
    'use strict'; 

    function SubjectQuizController($location, HelperService, QuizFactory, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Subject Quiz';
        vm.icon = "add_box";
        vm.showPassword = false;
        vm.subjectQuizzes = [];
        vm.pagenation = {
            limit: 5,
            page: 1,
        };

        init();

        function init() {
            vm.subject = HelperService.getAssignedRecord();
            vm.showPassword = true;
            //load assignments with class that is linked to
            QuizFactory.getQuizesBySubjectId(vm.subject.id).then(function (results) {
                for (var j = 0; j < results.length; j++) {
                    if (results[j].quizAnswers.length > 0) {
                    results[j].quizAnswered = true;
                    results[j].score = results[j].quizAnswers[0].score;

                    results[j].passOrFail = 'Failed';
                    var f = results[j].score.split('/');
                        var scoreCount = f[1] / 2;
                        if (f[0] >= scoreCount) {

                            results[j].passOrFail = 'Passed';
                        }
                        
                }
                vm.subjectQuizzes.push(results[j]);
                }
                
            });
            //vm.quizzes.$loaded(function (data) {
            //    vm.quizAnswers = $firebaseArray(ref.child('QuizAnswer'));
            //    vm.quizAnswers.$loaded(function (data) {
            //        for (var i = 0; i < vm.quizzes.length; i++) {
            //            if (vm.quizzes[i].subjectId == vm.subject.$id) {
            //                for (var j = 0; j < vm.quizAnswers.length; j++) {
            //                    if (vm.quizAnswers[j].studentId == $sessionStorage.userId && vm.quizAnswers[j].quizId == vm.quizzes[i].$id) {
            //                        vm.quizzes[i].score = vm.quizAnswers[j].score;
            //                        vm.quizzes[i].quizAnswered = true;
            //                        vm.quizzes[i].passOrFail = 'Failed';
            //                        var f = vm.quizzes[i].score.split('/');
            //                        var scoreCount = f[1] / 2;
            //                        if (f[0] >= scoreCount) {
            //                            vm.quizzes[i].passOrFail = 'Passed';
            //                        }
            //                    }   
            //                }
            //                vm.subjectQuizzes.push(vm.quizzes[i]);
            //            }   
            //        }
            //    });
            //});

        }

        vm.answerQuiz = function (quiz) {
            HelperService.assignCurrentRecord(quiz);
            $location.path('/quizQuestion');
        }

        vm.back = function () {
            $location.path('/subject');
        }

        vm.passProceed = function (password) {
            vm.formSubmitted = true;

            if (vm.subjectForm.$valid) {
                vm.showPassword = false;
            }
        }
    }

    angular.module('EL').controller('SubjectQuizController', SubjectQuizController);
    SubjectQuizController.$inject = ['$location', 'HelperService', 'QuizFactory', '$sessionStorage'];
})();
