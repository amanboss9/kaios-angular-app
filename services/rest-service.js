angular.module('restAPIManager', [])
    .service('restService',['$http','Constants',function($http,Constants) {
         
        this.appInitiated = function(version){
            return $http({
                method: 'GET',
                url: Constants.CONFIG.CONNECTION_URL+"/dummyHandler/"+version
            });
        }
    }]);