app.controller('one_ctrl', ['$scope', 'AVService', function($scope,  AVService)
{
	   $scope.init = function() {
           
           console.log("Controller one loaded");
           
           $scope.test = "One controller";
	       
       };
  
}]);
