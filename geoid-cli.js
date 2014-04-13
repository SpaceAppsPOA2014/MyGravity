#!/usr/local/bin/node

var geoid = require('./geoid'),
		arguments = process.argv.slice(2),
		lat = arguments[0],
		lng = arguments[1];


console.log('Retrieving Ondulation for: ' + lat + ', ' + lng)

geoid(lat, lng, function(err, height){
	if (err) return console.error(err)
	console.log('Geoid Height: '+height);
})