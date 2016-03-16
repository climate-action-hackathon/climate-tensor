var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request')


var accountSid = 'ACc49afb7cb75a11ee6e8e59ef28183663';
var authToken = "2f1556c78f1055c285f5303d592776fe";
var client = require('twilio')(accountSid, authToken);

 var app = express()
// App shit
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);



app.get('/', function(req, res) {
    res.json({ message: 'eff off' });   
});

app.get('/api/sixDayForecast', function(req, res) {
	var lon = req.query.lon;
	var lat = req.query.lat;
	console.log(lon)
	console.log(lat)
	var base = "https://earthnetworks.azure-api.net/getHourly6DayForecast/data/forecasts/v1/hourly?location="
	var additional = "&locationtype=latitudelongitude&units=english&offset=0&metadata=true&verbose=true&subscription-key=d484f320c70e43528cd85eae0618c45a"
	
	request(base + lon +','+ lat + additional, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    eval("var k = " + body);
	    k = k['hourlyForecastPeriod']
	    console.log(k.length)
	    console.log(k[2])
	    output = ''
	    fine = 0
	    for (var i=0; i<k.length; i++){
	    	if (i % 23 == 0) {
			    var bit = k[i];
			    output += '{"temperature":' + bit['temperature'] + 
			    ', "humidity":' + bit['relativeHumidity'] +
			    ', "precip":' + bit['adjustedPrecipProbability'] + 
			    ', "description":' + JSON.stringify(bit['description']) +
			    '},'
			    // output += k[i]
	    	}
		};
		// output = output.replace(/\//g, "")
		output = output.substr(0, output.length - 1)
		output = '{ "Six Forecast": [' + output + '] }'
		// output = output + "'"
	    console.log(output)
	    // eval("var finalout = " + output);
	    // console.log(output)
	    res.type('json'); 
	    res.send(output)
	 } else {
	 	res.json('error!')
	 }
	})
})

app.get('/api/thirtyDayForecast', function(req, res) {
	var location = req.query.location

	fs.readFile('../thirtydayscrapper/livingstone_combined.json', (err, data) => {
  		if (err) {
  			res.send(error)
  		}
  		else {
  			res.type('json')
  			res.send(data)	
  		}
	});

})


client.messages.create({
    body: "hi",
    to: "+254726957658",
    from: "+19802553729"
}, function(err, message) {
    console.log(err)
});


app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});