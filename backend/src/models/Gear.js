const mongoose = require("mongoose");

const equipmentsSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

const accessoriesSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

const essentialsSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

const GearSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	createdBy: {
		type: String,
	},
	note: {
		type: String,
	},
	template: {
		type: Boolean,
		default: false,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	equipments: [equipmentsSchema],
	accessories: [accessoriesSchema],
	essentials: [essentialsSchema],
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Gear", GearSchema);
