angular.module('header',[])
.component('header', {
	templateUrl: "components/header/header.html",
	controller: ['$scope','$http','$rootScope', function($scope,$http,$rootScope){
		
		var self = this;
		self.header="KaiOS Sample";

		self.changeHeader=function(event,data){
			self.header=data;
		}
		
		var changeHeaderListener=$rootScope.$on('changeHeader', self.changeHeader);
        $scope.$on("$destroy",changeHeaderListener); 
		
	}]
}); 