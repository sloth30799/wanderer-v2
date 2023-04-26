const mongoose = require("mongoose");

const accommodationsSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	cost: {
		type: Number,
	},
})

const transportationSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	cost: {
		type: Number,
	},
})

const TripSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	destination: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
	budget: {
		type: Number,
	},
	accommodations: accommodationsSchema,
	transportation: transportationSchema,
	note: {
		type: String
	},
	gear: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Gear",
	},
	completed: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Trip", TripSchema);
