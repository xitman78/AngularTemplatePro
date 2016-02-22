var app = angular.module('SliderAdminApp', []);

app.controller('SliderAdminCtrl', ['$scope', '$http', function($scope, $http)
{
    
       $scope.test = "Hello angular";
       
       $scope.slides_list = [];
       
       $scope.dir_slides = [];
       
       $scope.new_slide_form = false;
       
       $scope.new_slide = {title: "", description: "", width: 350, height: 350};
       
       $scope.selected_file = "";
       
       
	   $scope.init = function() {
         
         $scope.load_slides();
         
         $scope.load_dir_slides();
           
       };
       
      $scope.load_slides = function () {
           
            var responsePromise = $http.get("../slides.json");

            responsePromise.success(function(data, status, headers, config)
            {
                console.log("Slides loaded successfully ", data); 
                
                $scope.slides_list = data;
                   
            });
            responsePromise.error(function(data, status, headers, config)
            {
                console.log("Error loading slides");
                
                $scope.slides_list = [];

            });
           
       };
       
        $scope.load_dir_slides = function () {
           
            var responsePromise = $http.get("/admin/dir_slides.php");

            responsePromise.success(function(data, status, headers, config)
            {
                console.log("Slides directory was loaded successfully ", data); 
                
                $scope.dir_slides = data;
                
               // $scope.init_slides();
                   
            });
            responsePromise.error(function(data, status, headers, config)
            {
                console.log("Error loading dir slides");
                
                $scope.dir_slides = [];

            });
           
       };
       
       $scope.change_central_slide = function(index) {
           
           for(var i=0; i< $scope.slides_list.length; i++) {
               if($scope.slides_list[i].central) delete $scope.slides_list[i]["central"];
           }
           
           $scope.slides_list[index].central = true;
       };
       
       $scope.move_up = function(index) {
           var tmp = $scope.slides_list[index-1];
           $scope.slides_list[index - 1] = $scope.slides_list[index];
           $scope.slides_list[index] = tmp;
       };
       
       $scope.move_down = function(index) {
           var tmp = $scope.slides_list[index+1];
           $scope.slides_list[index + 1] = $scope.slides_list[index];
           $scope.slides_list[index] = tmp;
       };
       
       $scope.delete_slide = function(index) {
           
           if(!confirm("Are you sure that you want to delete this slide?")) return;
           
           $scope.slides_list.splice(index, 1);
       };
       
       $scope.add_new_slide = function() {
           $scope.new_slide_form = !$scope.new_slide_form;
       };
       
       $scope.select_file = function(file) {
           $scope.selected_file = file;
       };
       
       $scope.save_new_slide = function() {
           if(!$scope.selected_file) {
               alert("Slide image is not selected.");
               return;
           }
           if(!$scope.new_slide.title) {
               alert("Title is not defined");
               return;
           }
           
           var cpy = angular.copy($scope.new_slide);
           
           cpy.img_src = "/slides/" + $scope.selected_file;
           
           $scope.slides_list.splice(0, 0, cpy);
           
           $scope.new_slide = angular.copy({title: "", description: "", width: 350, height: 350});
           
           $scope.selectedx_file = "";
           
           $scope.new_slide_form = false;
       };
       
       $scope.save_slides_list = function() {
           
           var data = {};
           
           data.json = angular.toJson($scope.slides_list);
           
            var responsePromise = $http.post("/admin/save_slides.php", data);

            responsePromise.success(function(data, status, headers, config)
            {
                 if (data == "ok") {
                     alert("Slides were saved successfully");
                 }
                 else {
                     alert("" + data);
                 }
                //console.log("Slides saved successfully ", data); 
                
                //$scope.slides_list = data;
                   
            });
            responsePromise.error(function(data, status, headers, config)
            {
                console.log("Error saving slides");
                
                alert("Some error happened while saving slides.");
                
               // $scope.slides_list = [];

            });
           
       };
       
    
  
}]);
