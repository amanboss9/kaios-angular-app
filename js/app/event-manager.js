(function(angular) {
    'use strict';
    angular.module('kaios-sample-app')
        .service('$eventManager', function() {})
        .config(["$provide", function($provide) {
            $provide.decorator('$eventManager', ["$rootScope", "$delegate", function($rootScope, $delegate) {

                var currentActiveComponent = null;
                var currentComponent = function(ev, id) {
                    currentActiveComponent = id;
                    // console.log("currentComponentRendered---", currentActiveComponent)
                }
                document.addEventListener("keydown", function(ev) {
                    var event = ev;
                    var activeElement = naviBoard.getActiveElement();
                    switch (currentActiveComponent) {
                        case 'home':
                            if (event.keyCode == 13) { // center key button press action
                                activeElement.click();
                            } else if (event.keyCode == 107 || event.key == "Backspace") {

                            } else if (event.keyCode == 109 || event.key == "SoftLeft") {
                                $rootScope.$emit('home_softleft'); //key to invoke lsk by emmiting the event
                            } else if (event.key == "SoftRight" || event.keyCode == 106) {
                                $rootScope.$emit('home_softright'); //key to invoke rsk by emmiting the event
                            }
                            break;
                        case 'about':
                            if (event.keyCode == 13) {} else if (event.keyCode == 107 || event.key == "Backspace") {
                                $rootScope.$emit("goBackFromAbout");
                                event.preventDefault();
                            } else {

                            }
                            break;
                        default:
                    }
                })

                $delegate.getCurrentActiveComponent = function() {
                    return currentActiveComponent;
                };

                $rootScope.$on('componentActive', currentComponent);

                return $delegate;
            }]);
        }]);
})(angular);