'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');
const randomstring = require("randomstring");
const config = require('../config/config.json');

exports.registerUser = req =>

	new Promise((resolve,reject) => {

	  const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);
		const refreshToken = randomstring.generate();
		console.log("ok3");
		const newUser = new user({
			name: req.body.name,

			private_key:randomstring.generate(12),
			created_at: new Date(),
			refresh_token: refreshToken,

			isVerified: true,
		});
		console.log("ok4");
		newUser.save()
		console.log("ok5");

		.then(() => {
			console.log("ok6");

			resolve({ status: 201, message: 'User created!', refresh_token: refreshToken,  })

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
