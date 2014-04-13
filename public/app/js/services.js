angular.module('gravityBird')
	.service('api', function(){
		this.url = '/'
		this.geoid = function(latitude, longitude, callback) {
			this.get('geoid/'+latitude+'/'+longitude, callback)
		}
		this.get = function(path, callback) {
			$.get(this.url + path, callback)
		};
	})

	.service('sidebar', ['map', function(map){

		this.create = function(selector){
			this.view = L.control.sidebar(selector, {
				autoPan: false,
				closeButton: false,
				position: 'left'
			});
			map.addControl(this.view);
			
			//Workaround to move search inside sidebar
			$('#leaflet-control-geosearch-qry').parent().appendTo($('#search'));
		}

		this.show = function () {
		  this.view.show();
		  map.panBy([-this.getOffset() / 2, 0], {duration: 0.01});
		};
		
		this.getOffset = function(){
			return this.view.getOffset.apply(this.view, arguments)
		};

	}])

	.service('map', function(){

		this.create = function(selector) {
			this.mapView = L.map(selector);
			this.addTileProvider('http://162.243.104.38:9000/v2/sixdegrees/{z}/{x}/{y}.png');
			this.addGeoSearch( new L.GeoSearch.Provider.Google() );
			
			this.markerLayer = L.featureGroup([])
			this.markerLayer.addTo(this.mapView)
		};

		this.setView = function(latlng) {
			this.mapView.setView(latlng, 8);
		};

		this.addTileProvider = function(tileProviderUrl){
			L.tileLayer(tileProviderUrl, {
				maxZoom: 8
			}).addTo(this.mapView);
		}

		this.addGeoSearch = function(provider) {
			var geoSearch = new L.Control.GeoSearch({
				zoomLevel: 8,
				provider: provider,
				showMarker: false
			})
			geoSearch._showLocation = function(){}
			geoSearch.addTo(this.mapView);
		};

		this.panBy = function() {
			this.mapView.panBy.apply(this.mapView, arguments)
		};

		this.addControl = function(control) {
			this.mapView.addControl(control);
		};

		this.onLocate = function(callback) {
			this.mapView.on('geosearch_foundlocations', function(results){
				callback(results.Locations)
			});
		};

		this.clearMarkers = function(){
			this.markerLayer.clearLayers();
		}

		this.addMarker = function(latlng) {
			var marker = L.marker(latlng).addTo(this.mapView);
			this.markerLayer.addLayer(marker)
			return marker;
		};

		this.fitMakers = function(bounds) {
			this.mapView.fitBounds( this.markerLayer.getBounds().pad(0.2) )
		};

	})