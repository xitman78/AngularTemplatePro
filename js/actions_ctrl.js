app.controller('actions_ctrl', ['$scope', 'AVService', function($scope,  AVService)
{
	   $scope.init = function() {
           
           console.log("Controller actions loaded");
           
           $scope.test = "Two controller";
           
           AVService.set_page_title_prefix("Actions");
	       
       };
  
}]);
