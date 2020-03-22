const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productpageSchema = mongoose.Schema({
	name: {
		require: true,
		type: String,
		unique: 1,
		maxlength: 100
	},
	description: {
		require: true,
		type: String,
		maxlength: 100000
	},
	price: {
		require: true,
		type: Number,
		maxlength: 255
	},
	brand: {
		type: Schema.Types.ObjectId,
		ref: 'Brand',
		required: true
	},
	shipping: {
		type: Boolean,
		required: true	
	},
	available: {
		required: true,
		type: Boolean
	},
	color: {
		type: Schema.Types.ObjectId,
		ref: 'Color',
		required: true
	},
	length: {
		required: true,
		type: Number
	},
	sold: {
		type: Number,
		maxlength: 100,
		default: 0
	},
	publish: {
		required: true,
		type: Boolean
	},
	images: {
		type: Array,
		default: []
	}
},{timestamps: true});


const ProductPage = mongoose.model('ProductPage', productpageSchema);
module.exports = { ProductPage }









