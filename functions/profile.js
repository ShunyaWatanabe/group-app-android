'use strict';

const user = require('../models/user');

exports.getProfile = privateKey =>

	new Promise((resolve,reject) => {
		user.find({ private_key: privateKey })
			.then(users => {
			if (users.length == 0) {
				reject({ status: 404, message: 'User Not Found !' });
			} else {
				resolve(users[0]);
			}
		})

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

	});
