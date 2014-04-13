function API(url){
	this.url = url || '/'
}

API.prototype.geoid = function(latitude, longitude, callback) {
	this.get('geoid/'+latitude+'/'+longitude, callback)
}

API.prototype.get = function(path, callback) {
	$.get(this.url + path, callback)
};
