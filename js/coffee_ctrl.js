app.controller('coffee_ctrl', ['$scope', 'AVService', '$window', function($scope,  AVService, $window)
{
    
       $scope.slides_list = [
           {title: "Red Coffee", img_src: "slides/coffee-01.jpg", description: "Cup-Coffee, Red, 75г.\n40 штук/ящик\n\nCup-Coffee, Red, 150г.\n25 штук/ящик", width: 350, height:350, central: true},
           {title: "Black Coffee", img_src: "slides/coffee-02.jpg", description: "Cup-Coffee, Black, 75г.\n40 штук/ящик\n\nCup-Coffee, Black, 150г.\n25 штук/ящик", width: 350, height:350},
           {title: "Gold Coffee", img_src: "slides/coffee-03.jpg", description: "Cup-Coffee, Gold, 75г.\n40 штук/ящик\n\nCup-Coffee, Gold, 150г.\n25 штук/ящик",  width: 350, height:350}
       ]; 
           
       $scope.slides_copy = [{},{},{},{},{}];
          
       $scope.slides_margin = 50;
       $scope.slide_width = 350;
       $scope.central_slide = 1;
       
	   $scope.init = function() {
           
           AVService.set_page_title_prefix("Кава");
           
           $scope.init_slides();
	       
       };
       
       $scope.find_central_index = function() {
           
           for(var i = 0; i < $scope.slides_list.length; i++ ) {
               if($scope.slides_list[i].central) {
                   console.log("Found central slide");
                   return i;
               }
           }
           
           return 0;        
       };
       
       $scope.next_index = function(indx) {
           
           var mod = indx % $scope.slides_list.length;
           
           return mod;
           
       };
       
       $scope.prev_index = function(indx) {
           
           var res = indx;
           
           if (res >= 0 ) return res;
           
           return $scope.slides_list.length + res;
           
       };
       
       $scope.init_indexes = function() {
           
           for(var i = 0; i < $scope.slides_list.length; i++) {
               $scope.slides_list[i].index = i;
           }
           
       };
       
       $scope.toggle_slide = function(slide) {
           
           if(slide.expand) {
               slide.expand = false;
               slide.descr_style = {bottom: "-150px"};
           }
           else {
               slide.expand = true;
               slide.descr_style = {bottom: "0"};
           }
           
       };
      
       
       $scope.init_slides = function() {
           
           $scope.init_indexes();
           
           var central_index = $scope.find_central_index();
                                         
           $scope.slides_copy[0] = angular.copy($scope.slides_list[$scope.prev_index(central_index - 2)]); 
           $scope.slides_copy[1] = angular.copy($scope.slides_list[$scope.prev_index(central_index - 1)]);           
           $scope.slides_copy[2] = angular.copy($scope.slides_list[central_index]);         
           $scope.slides_copy[3] = angular.copy($scope.slides_list[$scope.next_index(central_index + 1)]);           
           $scope.slides_copy[4] = angular.copy($scope.slides_list[$scope.next_index(central_index + 2)]);
           
           
           var offset = (0 - $scope.slide_width - $scope.slides_margin);
           
           for(var i = 0; i < $scope.slides_copy.length; i++) {
               
               var style = { top: "0", left: "" + offset + "px" };
               
               offset += $scope.slides_margin;
               
               $scope.slides_copy[i].style = style;
               
               $scope.slides_copy[i].descr_style = {bottom: "-150px"};
               
               offset += $scope.slide_width;
           }
           
       };
       
       $scope.slide_left = function() {
           
           for(var i = ($scope.slides_copy.length - 1); i >= 1; i--) {
               
               $scope.slides_copy[ i ].style.left = $scope.slides_copy[ i - 1 ].style.left;
                
           }
           
           $scope.slides_copy.splice(0, 1);
           
           var copy_el = angular.copy($scope.slides_list[$scope.next_index($scope.slides_copy[3].index + 1)]);
           
           copy_el.style = {top: "0"};
           
           copy_el.style.left = ""  + ( ($scope.slide_width * 3) + ($scope.slides_margin * 3)) + "px";
           
           $scope.slides_copy.push(copy_el);
           
       };
       
       $scope.slide_right = function() {
           
            for(var i = 0; i < ($scope.slides_copy.length - 1 ); i++) {
               
               $scope.slides_copy[ i ].style.left = $scope.slides_copy[ i + 1 ].style.left;
               
           }
           
           $scope.slides_copy.splice($scope.slides_copy.length - 1 , 1);
           
           var copy_el = angular.copy($scope.slides_list[$scope.prev_index($scope.slides_copy[0].index - 1)]);
           
           copy_el.style = {top: "0"};
           
           copy_el.style.left = "-"  + ( $scope.slide_width + $scope.slides_margin ) + "px";
           
           $scope.slides_copy.splice(0, 0, copy_el);
       };
  
}]);
