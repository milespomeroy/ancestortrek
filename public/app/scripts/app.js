'use strict';

var app = angular.module('publicApp', [
  'ngCookies',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as main'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });

app.factory('FSWrapper', function($http) {
    return {
        user : function(token) {
            return $http.get('https://sandbox.familysearch.org/platform/users/current',
                {
                    headers : {
                        'Accept' : 'application/x-fs-v1+json',
                        'Authorization' : 'Bearer ' + token
                    }
                });;
        }
    }
});
