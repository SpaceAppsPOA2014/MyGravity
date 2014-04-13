angular.module('gravityBird', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/',{
			templateUrl: 'partials/home.html',
			controller: 'homeCtrl'
		});		
		$routeProvider.otherwise({redirectTo: '/'})
	}])