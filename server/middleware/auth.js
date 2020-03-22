const { User } = require('./../models/user');

let auth = (req, res, next) => {
	let token = req.cookies.j_auth;

	// create a function to find token
	User.findByToken(token, (err, user) => {
		if(err) throw err;
		if(!user) return res.json({
			isAuth: false,
			error: true
		});

		// is auth is ok
		req.token = token;
		req.user = user;
		next();
	})
}

module.exports = { auth }