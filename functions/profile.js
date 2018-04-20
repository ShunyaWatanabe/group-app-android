'use strict';

const user = require('../models/user');
const organization = require('../models/organization');

exports.getProfile = privateKey =>

	new Promise((resolve,reject) => {
		user.find({ private_key: privateKey }
			.then(users => {
				console.log("PRIVATE KEY 3",privateKey);
			if (users.length == 0) {
				console.log("PRIVATE KEY 4",privateKey);
				reject({ status: 404, message: 'User Not Found !' });
			} else {
				resolve(users[0]);
			}

		})

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

	});
