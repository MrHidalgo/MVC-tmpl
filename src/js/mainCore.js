const globalSettings = {
    appName: 'Eportfolio'
};

const HelpDesk = angular.module(
    globalSettings.appName, [
        'Eportfolio.Controllers',
        'kendo.directives',
    ]
);

HelpDesk.factory('httpResponseInterceptor', [
    '$q', '$location', function ($q) {

        return {
            request: function (config) {
                config.headers = config.headers || {};

                return config;
            },
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                return $q.reject(rejection);
            }
        }
    }
]);

HelpDesk.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpResponseInterceptor');
}]);

angular.module('Eportfolio.Controllers', []);
angular.module(globalSettings.modulesAreas, []);