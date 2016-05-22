const request = require("request");
const Promise = require("bluebird");
const cheerio = require("cheerio");
const fs = require("fs");
const dateFormat = require('dateformat')

const cityCode = "63684"
const testurl1 = "https://www.wunderground.com/history/wmo/" + cityCode + "/2009/1/1/MonthlyHistory.html"
const testurl2 = "https://www.wunderground.com/history/wmo/63684/2009/2/1/MonthlyHistory.html"

var JSONObj = {};
var counter = 0
Promise.promisifyAll(require("request"), {multiArgs: true});

function crawlSingle(urllol) {
	return new Promise(function (resolve, reject){
		request.getAsync(urllol)
			.spread(function (response, body) {
				    if (response.statusCode != 200) {
				        throw new Error('Unsuccessful attempt. Code: ' + response.statusCode);
				    }
				    return body;
				})
			.then(function(res){
				try {
					var $ = cheerio.load(res)
					var k = $('span[class=wx-value]')
					var meanTeamp = $(k[4])
					var meanTeamp = meanTeamp.text()
					console.log(meanTeamp)
					var precip = $(k[13])
					var precip = precip.text()
					console.log(precip)
					var wind = $(k[17])
					var wind = wind.text()
					console.log(wind)

					var nextMonth = $('div[class=next-link] a')
					var nextMonth = nextMonth.attr('href')
					console.log(nextMonth)

					counter = counter + 1

					JSONObj[counter] = {
						"meantemp": meanTeamp,
						"precip": precip, 
						"windspeed": wind
					}
					console.log(JSONObj)
					fs.writeFile('yeardata.json', JSON.stringify(JSONObj))
				}
				catch(err) {
					counter = counter + 1
					
					JSONObj[counter] = {
						"meantemp": 0,
						"precip": 0, 
						"windspeed": 0
					}
					fs.writeFile('yeardata.json', JSON.stringify(JSONObj))
				}

			})

		resolve(JSONObj)
	})

}

crawlSingle(testurl1)
	.then(crawlSingle(testurl2))
	.then(console.log)
	// .then(function(data){
	// 	console.log(JSONObj)
	// 	fs.writeFile('cibai.json', JSON.stringify(JSONObj))
	// })
