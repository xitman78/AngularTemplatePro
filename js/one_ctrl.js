app.controller('one_ctrl', ['$scope', 'AVService', function($scope,  AVService)
{
    
       $scope.slides_list = [
           {id: 0, title: "First Image", img_src:"slides/image01.png", width: 350, height:350, description: "Description for first image"},
           {id: 1, title: "Second Image", img_src:"slides/image01.png", width: 350, height:350, description: "Description for first image"},
           {id: 2, title: "Third Image", img_src:"slides/image01.png", width: 350, height:350, description: "Description for first image"},
           {id: 3, title: "Third Image", img_src:"slides/image01.png", width: 350, height:350, description: "Description for first image"}
           ];
       
	   $scope.init = function() {
           
           console.log("Controller one loaded");
           
           $scope.test = "One controller";
           
           AVService.set_page_title_prefix("One");
	       
       };
  
}]);
