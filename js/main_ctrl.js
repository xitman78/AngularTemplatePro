var app = angular.module('MihaProApp', ['ngRoute']);

app.factory('AVService', function ($rootScope) 
{
    
    var AVService = {};
    
    AVService.prefix = "";
    
    AVService.set_modal_mode = function(mode) 
    {      
        if(mode) $rootScope.$broadcast('modal_mode_on');
        else $rootScope.$broadcast('modal_mode_off');
    };
    
    AVService.set_page_title_prefix = function(prefix) {
        
        if(prefix) $rootScope.header = prefix + " :: AngularJS Template";
        else $rootScope.header = "AngularJS Template";

    }; 
    
    return AVService;
    
});

app.controller('mainController', [ '$scope', '$rootScope', '$location', 'AVService', function($scope, $rootScope, $location, AVService) 
{

    $scope.init = function()
    {
        $rootScope.header = "AngularJS Template";
        
        $scope.modal_mode = 0;
        
    };
    
    $rootScope.$on('modal_mode_on' , function () {
        $scope.modal_mode = 1;
	});
    
    $rootScope.$on('modal_mode_off' , function () {
        $scope.modal_mode = 0;
	});
    
    $scope.$on('$viewContentLoaded', function(event) {
        
        $scope.active_tab = $location.path();
        
    });
    
    $rootScope.$on('$routeChangeError', function(event) {
        
       alert("Route error");
        
    });

}]);