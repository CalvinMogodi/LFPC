(function () {
    'use strict';

    function CourseFactory($http, $q, apiUrl) {
        var getCourses = function () {

            var defered = $q.defer();
            var getCoursesComplete = function (response) {
                defered.resolve(JSON.parse(response.data));
            }

            $http.get(apiUrl + 'Courses/GetCourses').then(getCoursesComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var editCourse = function (course) {

            var defered = $q.defer();
            var editCourseComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.put(apiUrl + 'Courses/Edit', course).then(editCourseComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var getCourse = function (courseId) {

            var defered = $q.defer();
            var editCourseComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(apiUrl + 'Courses/Edit?id=' + courseId).then(editCourseComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var createCourse = function (course) {

            var defered = $q.defer();
            var createCourseComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(apiUrl + 'Courses/Create', course).then(createCourseComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var deleteCourse = function (courseId) {

            var defered = $q.defer();
            var deleteCourseComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.delete(apiUrl + 'Courses/Delete?id=' + courseId).then(deleteCourseComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        return {
            getCourses: getCourses,
            editCourse: editCourse,
            getCourse: getCourse,
            createCourse: createCourse,
            deleteCourse: deleteCourse,
        }
    }

    angular.module('EL').factory('CourseFactory', CourseFactory);
    CourseFactory.$inject = ['$http', '$q', 'apiUrl'];
})();