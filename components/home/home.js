angular.module('home', ['restAPIManager'])
    .component('home', {
        templateUrl: "components/home/home.html",
        controller: ['$scope', '$location', '$rootScope', 'restService', function($scope, $location, $rootScope, restService) {


            var self = this;
            self.routeToAbout = function() {
                $location.path('/about');
            }
            var softleftPressed = function() {
                toastr.success("Left key is pressed.")
            }
            var softrightPressed = function() {
                toastr.success("Right key is pressed.")
            }

            self.$onInit = function() {
                $('#loader').hide();
                $rootScope.$emit("componentActive","home");
                $rootScope.$emit('changeHeader', "Sample KaiOS");
                // restService.appInitiated("1.0.0")
                var footer = {
                    left: "SoftLeft",
                    right: "SoftRight",
                    center: null
                };
                $rootScope.$emit('changeFooter', footer);
                naviBoard.setNavigation("home");
            }

            self.$onDestroy = function() {
                naviBoard.destroyNavigation("home");
            }

            var handleleft = $rootScope.$on('home_softleft', softleftPressed);
            $scope.$on("$destroy", handleleft);

            var handleright = $rootScope.$on('home_softright', softrightPressed);
            $scope.$on("$destroy", handleright);

        }]
    })
    .component('about', {
        templateUrl: "components/about/about.html",
        controller: ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {

            var self = this;
            var backButtonPressed = function() {
                $scope.$apply(function() {
                    $location.path('/home');
                })
            }
            self.$onInit = function() {
                $rootScope.$emit('changeHeader', "About");
                $rootScope.$emit("componentActive","about");
                var footer = {
                    left: "",
                    right: "Back",
                    center: null
                };
                $rootScope.$emit('changeFooter', footer);
            }
            self.$onDestroy = function() {
            }

            var handle = $rootScope.$on('goBackFromAbout', backButtonPressed);
            $scope.$on("$destroy", handle);

        }]
    });