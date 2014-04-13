
var request = require('request'),
		cheerio = require('cheerio');

module.exports = function geoid(latitude, longitude, callback){
	var url = "http://geographiclib.sourceforge.net/cgi-bin/GeoidEval?input="+latitude+"%2C+"+longitude+"&option=Submit"

	request(url, function(err, response, html){
		if (err) return callback(err)

		var $ = cheerio.load(html),
				height = $("font[color='blue']").eq(0).text()

		callback(err, height)

	})
}
