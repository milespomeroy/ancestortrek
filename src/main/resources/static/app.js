angular.module('app', ['ngCookies']);

function Auth($cookies, $window, $http) {
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

    // runs only once on page load
    (function init() {
        var code = getQueryParam('code');

        if(code) {
            console.log('has code');
            $http.get('/oauth/token', {params : {code : code}})
                .success(function(data) {
                    // save auth token
                    $cookies.fs_token = data.access_token;
                    // remove code from url
                    history.replaceState({}, '', $window.location.origin + $window.location.pathname);
                });
        }
    })();
}
