const mongoose = require('mongoose');
const bcrypt = require('bcrypt');      //for password encryption
const jwt = require('jsonwebtoken')  // for generating token
const SALT_I = 10;
require('dotenv').config();      //for generating token

// about schema: https://www.jianshu.com/p/29c55aae3d6f
const userSchema = mongoose.Schema({
	email:{
		type: String,
		required: true,
		trim: true,
		unique: 1
	},
	password:{
		type: String,
		required: true,
		minlength: 5
	},
	name:{
		type: String,
		required: true,
		maxlength: 100
	},
	lastname:{
		type: String,
		required: true,
		maxlength: 100
	},
	cart:{
		type: Array,
		default: []
	},
	history:{
		type: Array,
		default: []
	},
	role:{
		type:Number,
		default:0
	},
	token:{
		type:String
	}
})

// before save, hase the password by using bcrypt
// ref: https://blog.csdn.net/zz110731/article/details/52712423?locationNum=7&fps=1
userSchema.pre('save', function(next){
	var user = this;

	if(user.isModified('password')){         //make sure not hasing password over and over again except when it has been changed

		bcrypt.genSalt(SALT_I, function(err, salt){        //generate new salt
			if(err) return next(err);

			bcrypt.hash(user.password, salt, function(err, hash){      //use new salt to hash password
			if(err) return next(err);

			user.password = hash;
			next();
			})
		})
	} else{
		next();
	}
})




//=================================
//            FUNCTIONS
//=================================



// add a new method into schema to compare password, and then run cb (call back function)
userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err);
		cb(null, isMatch);
	})
}


userSchema.methods.generateToken = function(cb) {
	var user = this;
	//user.id + password, MongoDB will store an user id
	var token = jwt.sign(user._id.toHexString(), process.env.SECRET);

	user.token = token;
	user.save(function(err, user) {
		if(err) return cb(err);
		cb(null, user);
	})
}


userSchema.statics.findByToken = function(token, cb) {
	var user = this;

	// use jwt to verify token with SECRET and then decode with returing user id if no err
	jwt.verify(token, process.env.SECRET, function(err, decode) {
		user.findOne({"_id": decode, "token": token}, function(err, user) {
			if(err) return cb(err);
			cb(null, user);
		})
	})
}







const User = mongoose.model('User', userSchema);

module.exports = { User }











