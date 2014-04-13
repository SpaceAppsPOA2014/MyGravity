angular.module('gravityBird')
	.service('sidebar', function(){

		this.create = function(selector){
			this.view = L.control.sidebar(selector, {
					autoPan: false,
		      closeButton: false,
		      position: 'left',
		  });
		}

		this.show = function () {
		  this.view.show();
		};

		this.showGame = function () {
		  this.view.setContent('banana');
		};

		this.getOffset = function(){
			return this.view.getOffset.apply(this.view, arguments)
		};

	})

	.service('map', function(){

		this.create = function(selector) {
			this.mapView = L.map(selector);
			this.addTileProvider('http://162.243.104.38:9000/v2/sixdegrees/{z}/{x}/{y}.png');
			this.addGeoSearch( new L.GeoSearch.Provider.OpenStreetMap() );
		};

		this.setView = function(latlng) {
			this.mapView.setView(latlng, 8);
		};

		this.addTileProvider = function(tileProviderUrl){
			L.tileLayer(tileProviderUrl).addTo(this.mapView);
		}

		this.addGeoSearch = function(provider) {
			new L.Control.GeoSearch({
				zoomLevel: 8,
				provider: provider,
				showMarker: true
			}).addTo(this.mapView);
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

		this.addMarker = function(latlng) {
			var marker = L.marker(latlng).addTo(this.mapView);
			return marker;
		};

	})