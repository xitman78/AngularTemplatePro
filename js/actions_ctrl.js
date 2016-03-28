app.controller('actions', ['$scope', 'AVService', function($scope,  AVService)
{
	   $scope.init = function() {
           
           console.log("Controller actions loaded");
           
           $scope.test = "Two controller";
           
           AVService.set_page_title_prefix("Акції");
	       
       };
  
}]);
