(function(angular, window) {
    'use strict';


    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "0",
        "timeOut": "2000",
        "extendedTimeOut": "300",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    } // toastr configuration for application.

    window.addEventListener('online', networkChange);
    window.addEventListener('offline', networkChange);
    

    // helper function to check the data connectivity/network fluctuations of application. 
    function networkChange() {
        var networkStatus = navigator.onLine ? "Network online" : "Looks like data is not available :( ";
        if (networkStatus == "Network online") {
            toastr.remove();
            toastr.success(networkStatus);
        } else {
            toastr.remove();
            toastr.error(networkStatus);
        }
    }

     $(document).ready(function() {
        document.getElementById("upperpadding").style.display = "block";
        document.getElementById("header").style.display = "block";
    });

    angular.module('kaios-sample-app', ["ngRoute","appConstants","home","header", "footer"])
        .factory('kaiosAppHttpIntercepter', function($q, $injector, $rootScope) {
            // kaiosAppHttpIntercepter service helps in intercepting the global request going via $http service . Developer can modify the request/Response body with this service.
            var incrementalTimeout = 1000;
            function retryRequest(httpConfig) {
                var $timeout = $injector.get('$timeout');
                var thisTimeout = incrementalTimeout;
                incrementalTimeout *= 2;
                return $timeout(function() {
                    var $http = $injector.get('$http');
                    return $http(httpConfig);
                }, thisTimeout);
            };

            return {
                'request': function(config) {
                    config.timeout = config.timeout || 5000;
                    return config;
                },
                'responseError': function(rejection) {
                    if(rejection.status == -1){
                        rejection.data = "Looks like data is not available :("
                        incrementalTimeout = 1000;
                    } else if (rejection.status == 404 && incrementalTimeout < 4000) {
                        return retryRequest(rejection.config);  //Retry the request on some particular condition
                    } else {
                        if (rejection.data.hasOwnProperty("error")) {
                            incrementalTimeout = 1000;
                        } else {
                            rejection.data = "Please try again later."
                            incrementalTimeout = 1000;
                        }
                    }
                    return $q.reject(rejection);
                }
            };
        })
        .run(['$eventManager','Constants','restService', function($eventManager, Constants) {
            //running the required services at starting of the application. 
        }])
        .config(['$locationProvider', '$routeProvider', '$httpProvider',
            function config($locationProvider, $routeProvider, $httpProvider) {

                $locationProvider.hashPrefix('!');
                $httpProvider.interceptors.push('kaiosAppHttpIntercepter');
                $httpProvider.defaults.withCredentials = true;
                $routeProvider.
                when('/home', {
                    template: '<home></home>'
                }).
                when('/about', {
                    template: '<about></about>'
                }).
                otherwise('/home');
            }
        ]);
})(angular, window);