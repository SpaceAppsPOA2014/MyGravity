angular.module('gravityBird')
	.controller('homeCtrl', ['$scope', 'map', 'sidebar', function($scope, map, sidebar){
		sidebar.create('sidebar')
		map.create('map')
		map.setView([51.505, -0.09])
		map.addControl(sidebar.view);

		sidebar.show()

		map.panBy([-sidebar.getOffset() / 2, 0], {duration: 0.01});

		$('#leaflet-control-geosearch-qry').parent().appendTo($('#search'));
	}])