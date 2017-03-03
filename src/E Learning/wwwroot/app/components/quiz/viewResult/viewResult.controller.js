(function () {
    'use strict';

    function ViewResultContorller($location, firebaseUrl, HelperService, $firebaseArray, alertDialogService, $firebaseObject, modal, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.heading = 'Quiz Results';
        vm.studentQuizAnswers = [];
        vm.isStudent = false;

        init();
        function init() {
            vm.quiz = HelperService.getAssignedRecord();
            vm.quizAnswers = $firebaseArray(ref.child('QuizAnswer'));
            vm.quizAnswers.$loaded(function (data) {
                vm.users = $firebaseArray(ref.child('User'));
                vm.users.$loaded(function (data) {
                    for (var i = 0; i < vm.quizAnswers.length; i++) {
                        if (vm.quizAnswers[i].quizId == vm.quiz.$id) {
                            for (var j = 0; j < vm.users.length; j++) {
                                if (vm.quizAnswers[i].studentId == vm.users[j].$id) {
                                    vm.quizAnswers[i].student = vm.users[j];
                                    vm.quizAnswers[i].passOrFail = 'Failed';
                                    var f = vm.quizAnswers[i].score.split('/');
                                    var scoreCount = f[1] / 2;
                                    if (f[0] >= scoreCount) {
                                        vm.quizAnswers[i].passOrFail = 'Passed';
                                    }
                                   
                                    vm.studentQuizAnswers.push(vm.quizAnswers[i]);
                                    break;
                                }
                                
                            }
                        }
                       
                    }
                });
            });
        }

        vm.cancel = function () {
            $location.path('/quiz');
        }
    }

    angular.module('EL').controller('ViewResultContorller', ViewResultContorller);
    ViewResultContorller.$inject = ['$location', 'firebaseUrl', 'HelperService', '$firebaseArray', 'alertDialogService', '$firebaseObject', 'modal', '$sessionStorage'];
})();
