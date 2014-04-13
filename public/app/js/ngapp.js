angular.module('gravityBird', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/',{
			templateUrl: 'partials/home.html',
			controller: 'homeCtrl'
		});
		$routeProvider.when('/game/:geoid', {templateUrl: 'partials/game.html'});
		$routeProvider.otherwise({redirectTo: '/'})
	}])