'use strict';

const user = require('../models/user');

const randomstring = require("randomstring");
const config = require('../config/config.json');

exports.registerUser = req =>
	new Promise((resolve,reject) => {

		const refreshToken = randomstring.generate();
		const privateKey = randomstring.generate(12);

		const newUser = new user({
			name: req.body.name,

			private_key:privateKey,
			created_at: new Date(),
			refresh_token: refreshToken,

			isVerified: true,
		});
		console.log("ok4");
		newUser.save(function(err){
			if (err) console.log(err);
		})

		.then(() => {
			console.log("ok6");
			console.log("PRIVATE KEY:",privateKey);

			resolve({ status: 201, message: 'User created!', refresh_token: refreshToken,  private_key: privateKey})

		})


		.catch(err => {
			console.log("ok7");
			if (err.code == 11000) {

				reject({ status: 409, message: 'User Already Registered !' });

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});
