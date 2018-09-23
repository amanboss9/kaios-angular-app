angular.module('footer', [])
    .component('footer', {
        templateUrl: "components/footer/footer.html",
        controller: ['$scope', '$rootScope',function($scope, $rootScope) {

            var self = this;
            self.leftkey = "Left key"; //Initial left key
            self.rightkey = "Right key"; //Initial right key
            self.center = null;
            self.showCenter = true;

            self.changeFooter = function(event, data) {
                self.leftkey = data.left;
                self.rightkey = data.right;
                self.checkwithComponentForRight = null;    // Initial enable/disable status is set to null.
                self.checkwithComponentForLeft = null;    // Initial enable/disable status is set to null.
                self.checkwithComponentForCenter = null;    // Initial enable/disable status is set to null.
                if (data.center == null) {
                    self.showCenter = true;
                } else {
                    self.showCenter = false;
                    self.center = data.center;
                }
            }


            var enableRight = function(event, componentInfo) {
                if (componentInfo.component == "abc") {
                    self.checkwithComponentForRight = !componentInfo.rightstatus;
                }else {

                }
            }
            var enableLeft = function(event, componentInfo) {
                if (componentInfo.component == "xyz") {
                    self.checkwithComponentForLeft = !componentInfo.leftstatus;
                }else{

                }
            }
            var enableCenter = function(event, componentInfo) {
                if (componentInfo.component == "mno") {
                    self.checkwithComponentForCenter = !componentInfo.centerstatus;
                }else{

                }
            }

            var changeFooterListener = $rootScope.$on('changeFooter', self.changeFooter);
            $scope.$on("$destroy", changeFooterListener);
            var centerEnableListener = $rootScope.$on('centerEnable', enableCenter);
            $scope.$on("$destroy", centerEnableListener);
            var RightEnableListener = $rootScope.$on('rightEnable', enableRight);
            $scope.$on("$destroy", RightEnableListener);
            var LeftEnableListener = $rootScope.$on('leftEnable', enableLeft);
            $scope.$on("$destroy", LeftEnableListener);

        }]
    });