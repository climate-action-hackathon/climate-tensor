const request = require("request");
const Promise = require("bluebird");
const cheerio = require("cheerio");

const rootURL = "https://www.wunderground.com/cgi-bin/findweather/getForecast?query=uganda&MR=1"
// const rootURL = "http://localhost:7788"
// const rootURL = "http://google.com"


let options = {
  url: rootURL,
  headers: {
    'User-Agent': 'request'
  }
};

// multiArgs needs to be set to true (in order to correctly pass array to spread)
Promise.promisifyAll(require("request"), {multiArgs: true});
// Promise.promisifyAll(require("cheerio"));

let areas = [];
let areasURL = [];

request.getAsync(options)
	.spread(function (response, body) {
		    if (response.statusCode != 200) {
		        throw new Error('Unsuccessful attempt. Code: ' + response.statusCode);
		    }
		    return body;
		})
	.then(function (res) {
		var $ = cheerio.load(res)
		// var z = $('td a')
		// console.log(z)
		// console.log(typeof z)
		// console.log(z[0])

		$('td a').map(function(i, foo) {
			foo = $(foo);
			areas.push(foo.text());
			areasURL.push(foo.attr('href'));
			// console.log(foo.text());
			// console.log(foo.attr('href'));
			// console.log(areas)
			
		})
		return (areas, areasURL)
	})
	// .spread(function())
	// .then(console.log)
	// .then(console.log(areasURL))
	.catch(console.error);