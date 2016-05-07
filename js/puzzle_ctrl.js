app.controller('puzzle_ctrl', ['$scope', 'AVService', function($scope,  AVService)
{
	   $scope.init = function() {
           
           console.log("Controller puzzle loaded");
           
           $scope.test = "Three controller\n and some text here.";
           
           AVService.set_page_title_prefix("Puzzle");
           
           $scope.puzzle  =  new PuzzleField();
	       
       };
       
    /*   $scope.cell_click = function (cell) {
           
           //console.log("Cell clicked " + cell.text);
           $scope.puzzle.cell_click(cell);
           
           //$scope.apply();
           
       } */ 
  
}]);
