var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request')
var mongoose = require('mongoose');


// var lol = require('../models/Farmers.js')

// Twilio
var accountSid = process.env.TWIID;
var authToken = process.env.TWITOKEN;
var client = require('twilio')(accountSid, authToken);

 var app = express()
// App shit
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

// Farmer
var Farmer = require('./models/Farmers')

// Mongo Connection
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});


// API Starts
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

	res.type('json')
	res.send(omg)
	// fs.readFile('../thirtydayscrapper/livingstone_combined.json', (err, data) => {
 //  		if (err) {
 //  			res.send(err)
 //  		}
 //  		else {
 //  			res.type('json')
 //  			res.send(data)	
 //  		}
	// });

})

app.get('/api/sendtext', function(req, res) {
	var number = req.query.number
	var message = req.query.message

	client.messages.create({
	    body: message,
	    to: '+' + number,
	    from: "+19802553729"
	}, function(err, message) {
	    if (err) {
	    	res.send(err)
	    } else {
	    	res.send('success, i think')
	    }
	});

})


// Add farmer API

app.post('/api/addfarmer', function(req, res) {

	var farmer = new Farmer({
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


app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});


var omg = {
	"1": {
		"pre": "12 m",
		"lotemp": "19",
		"hitemp": "28"
	},
	"2": {
		"pre": "5 m",
		"lotemp": "20",
		"hitemp": "29"
	},
	"3": {
		"pre": "6 m",
		"lotemp": "19",
		"hitemp": "28"
	},
	"4": {
		"pre": "9 m",
		"lotemp": "19",
		"hitemp": "29"
	},
	"5": {
		"pre": "17 m",
		"lotemp": "19",
		"hitemp": "30"
	},
	"6": {
		"pre": "5 m",
		"lotemp": "20",
		"hitemp": "29"
	},
	"7": {
		"pre": "3 m",
		"lotemp": "18",
		"hitemp": "31"
	},
	"8": {
		"pre": "7 m",
		"lotemp": "19",
		"hitemp": "25"
	},
	"9": {
		"pre": "12 m",
		"lotemp": "20",
		"hitemp": "25"
	},
	"10": {
		"pre": "2 m",
		"lotemp": "18",
		"hitemp": "26"
	},
	"11": {
		"pre": "4 m",
		"lotemp": "18",
		"hitemp": "31"
	},
	"12": {
		"pre": "3 m",
		"lotemp": "17",
		"hitemp": "30"
	},
	"13": {
		"pre": "0 m",
		"lotemp": "17",
		"hitemp": "30"
	},
	"14": {
		"pre": "1 m",
		"lotemp": "17",
		"hitemp": "29"
	},
	"15": {
		"pre": "0 m",
		"lotemp": "15",
		"hitemp": "30"
	},
	"16": {
		"pre": "0 m",
		"lotemp": "17",
		"hitemp": "29"
	},
	"17": {
		"lotemp": "18",
		"hitemp": "28",
		"pre": "0 m"
	},
	"18": {
		"lotemp": "18",
		"hitemp": "28",
		"pre": "0 m"
	},
	"19": {
		"lotemp": "17",
		"hitemp": "28",
		"pre": "0 m"
	},
	"20": {
		"lotemp": "17",
		"hitemp": "28",
		"pre": "0 m"
	},
	"21": {
		"lotemp": "17",
		"hitemp": "27",
		"pre": "0 m"
	},
	"22": {
		"lotemp": "17",
		"hitemp": "30",
		"pre": "0 m"
	},
	"23": {
		"lotemp": "18",
		"hitemp": "31",
		"pre": "0 m"
	},
	"24": {
		"lotemp": "17",
		"hitemp": "29",
		"pre": "0 m"
	},
	"25": {
		"lotemp": "17",
		"hitemp": "29",
		"pre": "0 m"
	},
	"26": {
		"lotemp": "17",
		"hitemp": "30",
		"pre": "0 m"
	},
	"27": {
		"lotemp": "17",
		"hitemp": "31",
		"pre": "0 m"
	},
	"28": {
		"lotemp": "17",
		"hitemp": "27",
		"pre": "0 m"
	},
	"29": {
		"lotemp": "17",
		"hitemp": "31",
		"pre": "0 m"
	},
	"30": {
		"lotemp": "17",
		"hitemp": "31",
		"pre": "0 m"
	},
	"31": {
		"lotemp": "16",
		"hitemp": "28",
		"pre": "0 m"
	},
	"32": {
		"lotemp": "15",
		"hitemp": "27",
		"pre": "0 m"
	},
	"33": {
		"lotemp": "15",
		"hitemp": "28",
		"pre": "0 m"
	},
	"34": {
		"lotemp": "16",
		"hitemp": "28",
		"pre": "0 m"
	},
	"35": {
		"lotemp": "14",
		"hitemp": "28",
		"pre": "0 m"
	},
	"36": {
		"lotemp": "15",
		"hitemp": "30",
		"pre": "0 m"
	},
	"37": {
		"lotemp": "13",
		"hitemp": "31",
		"pre": "0 m"
	},
	"38": {
		"lotemp": "15",
		"hitemp": "31",
		"pre": "0 m"
	},
	"39": {
		"lotemp": "16",
		"hitemp": "28",
		"pre": "0 m"
	},
	"40": {
		"lotemp": "15",
		"hitemp": "28",
		"pre": "0 m"
	},
	"41": {
		"lotemp": "14",
		"hitemp": "27",
		"pre": "0 m"
	},
	"42": {
		"lotemp": "13",
		"hitemp": "27",
		"pre": "0 m"
	},
	"43": {
		"lotemp": "12",
		"hitemp": "27",
		"pre": "0 m"
	},
	"44": {
		"lotemp": "12",
		"hitemp": "27",
		"pre": "0 m"
	},
	"45": {
		"lotemp": "14",
		"hitemp": "27",
		"pre": "0 m"
	}
}
