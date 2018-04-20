'use strict';

const user = require('../models/user');
const organization = require('../models/organization');

exports.getProfile = privateKey =>

	new Promise((resolve,reject) => {

		user.find({ private_key: 'owhxYgL70YMf' },{name:0})
			.then(users => {
			if (users.length == 0) {
				console.log("PRIVATE KEY 3",privateKey);
				reject({ status: 404, message: 'User Not Found !' });
			} else {
				resolve(users[0]);
			}

		})

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

	});
