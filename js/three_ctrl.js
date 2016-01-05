app.controller('three_ctrl', ['$scope', 'AVService', function($scope,  AVService)
{
	   $scope.init = function() {
           
           console.log("Controller three loaded");
           
           $scope.test = "Three controller";
           
           AVService.set_page_title_prefix("Three");
	       
       };
  
}]);
