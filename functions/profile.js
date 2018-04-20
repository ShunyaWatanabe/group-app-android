'use strict';

const user = require('../models/user');

exports.getProfile = privateKey =>{

	console.log("octobertest1");
	new Promise((resolve,reject) => {
		console.log("octobertest2");
		user.find({ private_key: privateKey })
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

}
