function Map(selector){
	this.mapView = L.map(selector);
	this.addTileProvider('http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}');
	this.addGeoSearch( new L.GeoSearch.Provider.OpenStreetMap() );
}

Map.prototype.setView = function(latlng) {
	this.mapView.setView(latlng, 8);
};

Map.prototype.addTileProvider = function(tileProviderUrl){
	L.tileLayer(tileProviderUrl).addTo(this.mapView);
}

Map.prototype.addGeoSearch = function(provider) {
	new L.Control.GeoSearch({
		zoomLevel: 8,
		provider: provider,
		showMarker: true
	}).addTo(this.mapView);
};

Map.prototype.onMapClick = function(callback){
	this.mapView.on('click', callback)
}

Map.prototype.openPopup = function(popup){
	popup.openOn(this.mapView)
}

Map.prototype.createPopup = function() {
	return L.popup()
};

Map.prototype.addControl = function(control) {
	this.mapView.addControl(control);
};

Map.prototype.panBy = function() {
	this.mapView.panBy.apply(this.mapView, arguments)
};

Map.prototype.onLocate = function(callback) {
	this.mapView.on('geosearch_foundlocations', function(results){
		callback(results.Locations)
	});
};

Map.prototype.addMarker = function(latlng) {
	var marker = L.marker(latlng).addTo(this.mapView);
	return marker;
};