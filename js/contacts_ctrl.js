app.controller('contacts_ctrl', ['$scope', 'AVService', function($scope,  AVService)
{
	   $scope.init = function() {
           
           console.log("Controller three loaded");
           
           $scope.test = "Three controller\n and some text here.";
           
           AVService.set_page_title_prefix("Three");
	       
       };
  
}]);
