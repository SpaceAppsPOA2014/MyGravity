var map = new Map('map', [sidebar]),
		api = new API('/'),
		popup = map.createPopup();


map.setView([51.505, -0.09])

map.onLocate(function(locations){
  var location = locations[0],
      marker = map.addMarker([location.Y, location.X]);

  marker.bindPopup("Loading Geoid Height").openPopup()

  api.geoid(location.Y, location.X, function(geoid_height){
    var button = $("<button id='play' class='ui blue button'>Play!</button>");
    button.on('click', function (e) {
      e.target.disabled;
      e.target.classList.add('disabled');

      var iframeContent = $('.game').contents();
      iframeContent.find('#game').css('visibility', 'visible');

      $('#search').hide();
      $('#new-location').show();
    });

    marker.getPopup().setContent(
      location.Label +
      "</br></br> Latitude: " + location.Y +
      "</br>Longitude: " + location.X +
      "</br></br> Geoid Height: " + geoid_height +
      "</br>"
    );

    $(".leaflet-popup-content").append(button);
  });
});
