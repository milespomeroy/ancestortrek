'use strict';

var mainCtrl = function Auth($scope, $cookies, $window, $location, $rootScope, $http, FSWrapper) {
    $scope.user = {
        fsUser : 'waiting for data'
    };

    this.hasToken = function() {
        return $cookies.fs_token ? true : false;
    };

    this.logout = function() {
        delete $cookies.fs_token;
    };

    // taken from MDN Window doc
    function getQueryParam(param) {
        return decodeURI(
            $window.location.search.replace(
                new RegExp("^(?:.*[&\\?]" + encodeURI(param).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"),
                "$1")
        );
    }

    var code = getQueryParam('code');

    if(code) {
        $http.get('http://localhost:9090/oauth/token', {params : {code : code}})
            .success(function(data) {
                // save auth token
                $cookies.fs_token = data.access_token;
                // remove code from url
//                history.replaceState({}, '', $window.location.origin + $window.location.pathname);
                $window.location = '/';
            });
    }

    if($cookies.fs_token) {
        FSWrapper.user($cookies.fs_token).then(function(d) {
            $scope.user.fsUser = d.data.users[0].contactName;
        });
    }
}

angular.module('publicApp').controller('MainCtrl', mainCtrl);
