app.controller('puzzle_ctrl', ['$scope', 'AVService', '$interval', '$filter', function($scope,  AVService, $interval, $filter)
{
	   $scope.init = function() {
           
           console.log("Controller puzzle loaded");
           
           $scope.test = "Three controller\n and some text here.";
           
           AVService.set_page_title_prefix("Puzzle");
           
           $scope.puzzle  =  new PuzzleField(4, 4, 70);
           
           $scope.puzzle.timer_text = '';
           	       
       };
       
       $scope.new_game = function() {
            
            $scope.startTime = new Date();
            
            $scope.curTime = $scope.startTime;
            
            $scope.puzzle.timerPro = $interval(function() {
                
                $scope.curTime = new Date();
                
                var ms = Math.abs($scope.curTime.getTime() - $scope.startTime.getTime());
                
                $scope.puzzle.timer_text = ($filter('date')(ms, 'mm:ss:sss')).substring(0,7);
                    
            }, 100);  
            
            $scope.puzzle.shuffle();
       };
       
       $scope.solve = function() {
           
            if($scope.puzzle.timerPro) $interval.cancel($scope.puzzle.timerPro);
            
            $scope.puzzle.solve();  
       };

  
}]);
