'use strict';

const user = require('../models/user');
const organization = require('../models/organization');

exports.getProfile = email =>

	new Promise((resolve,reject) => {

		user.find({ private_key: private_key }
			.then(users => {

			if (users.length == 0) {
				reject({ status: 404, message: 'User Not Found !' });
			} else {
				resolve(users[0]);
			}

		})

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

	});
