var mongoose = require('mongoose');

var farmerSchema = new mongoose.Schema({
	
	// _teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	name: String, 
	location: String, 
	phoneNumber: Number, 
	farmSize: Number,
	rainfallRisk: Number, 
	tempRisk: Number, 
	humidityRisk: Number, 

	crop: String
	// address: {
	// 	lineOne: String, 
	// 	lineTwo: String, 
	// 	postCode: Number, 
	// 	state: String
	// }, 	

	// time : { type : Date, default: Date.now }

})

module.exports = mongoose.model('Farmer', farmerSchema);