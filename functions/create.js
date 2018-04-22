'use strict';

const user = require('../models/user');
const group = require('../models/group');


exports.createGroup = (user) =>
	new Promise((resolve,reject) => {
		console.log('test1');

		const newGroup = new group({
			name: "RANDOM NAME",
	//		members:[user]，
	
			created_at: new Date(),		

			isVerified: true


		});
		console.log('test2');
		newGroup.save()

		.then(() => {
			console.log('test3');
		
			resolve({ status: 201, message: 'Group created!', refresh_token: refreshToken,  private_key: privateKey})

		})


		.catch(err => {
			console.log('test4');
		
			if (err.code == 11000) {


				reject({ status: 409, message: 'Group Already Registered !' });

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});
