var map = new Map('map', [sidebar]),
		api = new API('/'),
		popup = map.createPopup();


map.setView([51.505, -0.09])

map.onLocate(function(locations){
  var location = locations[0],
      marker = map.addMarker([location.Y, location.X]);

  marker.bindPopup("Loading Geoid Height").openPopup()

  api.geoid(location.Y, location.X, function(geoid_height){
    var button = $("<button id='play' type='button'>Let's start the GAME!!</button>");
    button.on('click', function (e) {
      // e.view.sidebar.showGame();
    });

    marker.getPopup().setContent(
      location.Label +
      "</br></br> Latitude: " + location.Y +
      "</br>Longitude: " + location.X +
      "</br></br> Geoid Height: " + geoid_height
    );

    $(".leaflet-popup-content").append(button)
  });
});
