'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

exports.checkTokens = req =>

	new Promise((resolve,reject) => {

		console.log("test1");
		const token = req.headers['x-access-token'];
		console.log("test2");
		const refreshToken = req.headers['refresh-token'];
		console.log("test3");
		const private_key = req.headers['private_key'];
		console.log("test4");
		if (token) {

			try {

  				var decoded = jwt.verify(token, config.secret);
					console.log("test5");
  				if(decoded.message === private_key){
						console.log("test5.5");
  					resolve({ status: 200, message: "Correct token"});
  				}
  				else{
						console.log("test6",private_key, "ref", refresh_token);

  					user.find({ private_key: private_key }, {refresh_token:1})

						.then(users => {
						if (users.length == 0) {
							console.log("test7");

							reject({ status: 404, message: 'User Not Found !' });

						} else {
							console.log("test8");
							if(users[0].refresh_token === refreshToken){

								resolve({ status: 203, message: private_key });
							}
							else{
								reject({ status: 403, message: 'Wrong refresh token' });
							}

						}
					})

					.catch(err => reject({ status: 404, message: 'User Not Found !' }));

  				}

			} catch(err) {
				user.find({ private_key: private_key }, { refresh_token: 1})

						.then(users => {
						if (users.length == 0) {

							reject({ status: 404, message: 'User Not Found !' });

						} else {
							if(users[0].refresh_token === refreshToken){

								resolve({ status: 203, message: private_key });

							}
							else{
								reject({ status: 403, message: 'Wrong refresh token' });

							}

						}
					})
					.catch(err => reject({ status: 404, message: 'User Not Found !' }));

				}

		} else {
			reject({ status: 405, message: 'Invalid Credentials !'});

		}

	});
