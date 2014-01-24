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
            // TODO: get auth token (from my server) and set cookie
            $cookies.fs_token = 'blah';
            // remove code from url
            history.replaceState({}, '', $window.location.origin + $window.location.pathname);
        }
    })();
}