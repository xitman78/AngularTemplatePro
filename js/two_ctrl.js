app.controller('two_ctrl', ['$scope', 'AVService', function($scope,  AVService)
{
	   $scope.init = function() {
           
           console.log("Controller two loaded");
           
           $scope.test = "Two controller";
	       
       };
  
}]);
