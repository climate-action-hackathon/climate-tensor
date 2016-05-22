// "use strict";
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const request = require('request')
const mongoose = require('mongoose');
const path = require('path');
// Twilio
// const accountSid = process.env.TWIID;
// const authToken = process.env.TWITOKEN;
// const client = require('twilio')(accountSid, authToken);

// Weather Stuff

const geoAPIKey = process.env.GEOKEY;
const earthAPIKEY = process.env.EARTHKEY

const app = express()
// App shit
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('port', process.env.PORT || 7788);

// Farmer
const Farmer = require('./models/Farmers')

// Mongo Connection
// mongoose.connect(process.env.MONGODB);
// mongoose.connection.on('error', function() {
//   console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
// });


// API Starts
app.get('/', function(req, res) {
    res.json({ message: 'eff off' });   
});

// Arua,Entebbe,Fort Portal,Gulu,Jinja,Kabale,Kampala,Kasese,Masindi,Mbarara,Moroto,Paraa,Soroti,Tororo

app.get('/api/sixDayForecast', function(req, res) {
	let lon = req.query.lon;
	let lat = req.query.lat;
	let location = req.query.location
	console.log(location)

	// should really use a geolocation api @@
	switch (location) {
		case "arus":
			lon = -0.2;
			lat = 20;
			break;
	}
	// console.log(lon)
	// console.log(lat)
	const base = "https://earthnetworks.azure-api.net/getHourly6DayForecast/data/forecasts/v1/hourly?location="
	const additional = "&locationtype=latitudelongitude&units=english&offset=0&metadata=true&verbose=true&subscription-key="
	
	request(base + lon +','+ lat + additional + earthAPIKEY, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	// use strict does not allow the use of eval
	    eval("var k = " + body);
	    k = k['hourlyForecastPeriod']
	    // console.log(k.length)
	    // console.log(k[2])
	    output = ''
	    fine = 0
	    for (let i=0; i<k.length; i++){
	    	// k has 142 data points for the next 6 days. pick only 6 data points to represent the next
	    	if (i % 23 == 0) {
			    let bit = k[i];
			    // create own json
			    output += '{"temperature":' + bit['temperature'] + 
			    ', "humidity":' + bit['relativeHumidity'] +
			    ', "precip":' + bit['adjustedPrecipProbability'] + 
			    ', "windspeed":' + bit['windSpeed'] +
			    ', "description":' + JSON.stringify(bit['description']) +
			    '},'
			    // output += k[i]
	    	}
		};
		// output = output.replace(/\//g, "")

		// sanitization
		output = output.substr(0, output.length - 1)
		output = '{ "sixForecast": [' + output + '] }'
		// output = output + "'"
	    console.log(output)
	    // eval("let finalout = " + output);
	    // console.log(output)
	    res.type('json'); 
	    res.send(output)
	 } else {
	 	res.json('error!')
	 }
	})
})	

app.get('/api/sixDayForecastLocation', function(req, res) {
	let location = req.query.location
	const base_geo = "http://api.opencagedata.com/geocode/v1/geojson?query="
	const additional_geo = "%2C+uganda&pretty=1&key="

	request(base_geo + location + additional_geo + geoAPIKey, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			body = JSON.parse(body)
			var lon = body.features[0].geometry.coordinates[0]
			var lat = body.features[0].geometry.coordinates[1]
			console.log(lon)
			console.log(lat)
			const base = "https://earthnetworks.azure-api.net/getHourly6DayForecast/data/forecasts/v1/hourly?location="
			const additional = "&locationtype=latitudelongitude&units=english&offset=0&metadata=true&verbose=true&subscription-key="
			request(base + lon +','+ lat + additional + earthAPIKEY, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			  	// use strict does not allow the use of eval
			    eval("var k = " + body);
			    k = k['hourlyForecastPeriod']
			    // console.log(k.length)
			    // console.log(k[2])
			    output = ''
			    fine = 0
			    for (let i=0; i<k.length; i++){
			    	// k has 142 data points for the next 6 days. pick only 6 data points to represent the next
			    	if (i % 23 == 0) {
					    let bit = k[i];
					    // create own json
					    output += '{"temperature":' + bit['temperature'] + 
					    ', "humidity":' + bit['relativeHumidity'] +
					    ', "precip":' + bit['adjustedPrecipProbability'] + 
					    ', "windspeed":' + bit['windSpeed'] +
					    ', "description":' + JSON.stringify(bit['description']) +
					    '},'
					    // output += k[i]
			    	}
				};
				// output = output.replace(/\//g, "")

				// sanitization
				output = output.substr(0, output.length - 1)
				output = '{ "sixForecast": [' + output + '] }'
				// output = output + "'"
			    console.log(output)
			    // eval("let finalout = " + output);
			    // console.log(output)
			    res.type('json'); 
			    res.send(output)
			 } else {
			 	res.json('error in weather service (earthnetworks')
			 }
			})
		} else {
			res.json('error in reverse geocoding!')
		}
	})
})


app.get('/api/thirtyDayForecast', function(req, res) {
	let location = req.query.location

	// res.type('json')
	// res.send(omg)

	// need to refactor this

	fs.readFile(path.join(process.cwd(),'/livingstone_combined.json'), (err, data) => {
  		if (err) {
  			res.send(err)
  		}
  		else {
  			res.type('json')
  			res.send(data)	
  		}
	});

})

// Twilio

app.get('/api/sendtext', function(req, res) {
	let number = req.query.number
	let message = req.query.message

	client.messages.create({
	    body: message,
	    to: '+' + number,
	    from: process.env.TWINUM || +4423232323 // random phone number for now
	}, function(err, message) {
	    if (err) {
	    	res.send(err)
	    } else {
	    	res.send('Success. Message sent to ' + number)
	    }
	});

})


// Add farmer API

app.post('/api/addfarmer', function(req, res) {

	let farmer = new Farmer({
		name: req.body.fullname,
		location : req.body.loc,
		phoneNumber : req.body.phone,
		farmSize : req.body.farmsize,
		rainfallRisk : req.body.rain,
		tempRisk : req.body.temp,
		humidityRisk : req.body.humidity, 
		crop: req.body.crop
	})
	console.log(req.body.loc)
	farmer.save(function(err) {
		if (err) return (err);
		res.json('success!')
	})

})

app.get('/api/allfarmers', function(req, res) {
	Farmer
		.find()
		.sort()
		.exec(function(err, k) {
			res.jsonp(k)
		})
})

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(404).send('API route not found!');
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

