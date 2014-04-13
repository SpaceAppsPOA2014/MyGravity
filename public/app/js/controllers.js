angular.module('gravityBird')
	.controller('homeCtrl', ['$scope', 'map', 'sidebar', 'api', function($scope, map, sidebar, api){		
		map.create('map')
		map.setView([51.505, -0.09])	
		sidebar.create('sidebar')
		sidebar.show()			

		map.onLocate(function(locations){
			$scope.updateSearch(locations)
			$scope.$digest();				
		});		

		$scope.overLocation = function(location){
			location.marker.openPopup();
		}

		$scope.leaveLocation = function(location){
			location.marker.closePopup();
		}

		$scope.openGame = function(location){
			$scope.game = { open: true }
			var iframeGame = document.getElementsByClassName('game')[0];						
	  		iframeGame.contentWindow['GRAVITY'] = parseFloat(location.geoid);	  		
		}

		$scope.closeGame = function(){
			$scope.game = { open: false }			
			var iframeGame = document.getElementsByClassName('game')[0];						
			iframeGame.src = iframeGame.src;
		}

		$scope.updateMarkers = function(locations){
			map.clearMarkers();
			angular.forEach(locations, function(location){				
				location.marker = map.addMarker([location.Y, location.X]);				
				location.marker.bindPopup(
			      "<div>"+
				      location.Label +
				      "</br></br> Latitude: "+location.Y +
				      "</br>Longitude: "+location.X +				      
				      "</br>"+
			      "</div>"
			    );
			});
			map.fitMakers()
		}

		$scope.updateSearch = function(locations){		
			$scope.updateMarkers(locations)	

			angular.forEach(locations, function(location){
				api.geoid(location.Y, location.X, function(geoid_height){
					location.geoid = geoid_height;
					$scope.$digest()
				});
			})

			$scope.search = {
				heading: 'Found ' + locations.length + ' places' ,
				locations: locations
			}
		}



		$scope.resetSearch = function(){			
			$scope.search = {
				heading: 'Popular Places' ,
				locations: [
					{Label: 'Mount Everest', Y: 27.9878943, X: 86.9247837, geoid: -28.5204},
					{Label: 'Oslo, Norway', Y: 59.9138688, X: 10.752245399999993, geoid: 39.3533},					
					{Label: 'Porto Alegre - ( Where Gravity Bird was created', Y: -30.0346471, X: 51.217658400000005, geoid: 5.0939}
				]
			}
			$scope.updateMarkers($scope.search.locations)
		}

		$scope.resetSearch();								  
	}])
