'use strict';

const user = require('../models/user');
const group = require('../models/group');


exports.createGroup = (user) =>
	new Promise((resolve,reject) => {


		const newGroup = new group({
			name: "Test1",
	//		members:[user]，
			created_at: new Date(),
			isVerified: true
		});

		newGroup.save()
		.then(() => {
			//shoudl retrun more here todo
			resolve({ status: 201, message: 'Group created!'})
		})
		.catch(err => {
			if (err.code == 11000) {
				reject({ status: 409, message: 'Group Already Registered !' });
			} else {
				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});

	exports.createGroupFromUsers = (usersArray) =>
		new Promise((resolve,reject) => {
			console.log("In promise");

			const newGroup = new group({
				name: "New Group",
				created_at: new Date(),
				isVerified: true,
				members:{}
			});
			console.log("Mapping");
			console.log("Array",usersArray);
			usersArray.map(function(user){
				console.log("user key being added",user.key);
			//Adding private keys
				user.findOne({private_key:user.key},function(err,obj){
					if (err) console.log(err);
					console.log("User found",obj);
					// var result = createResponse(obj);
					// console.log("Response", result);
					newGroup.members.push(obj._id);
				})
			});
			console.log("Members are", newGroup.members)
			console.log("Group formed");
			newGroup.save()
			.then(() => {

				console.log("New Group2",newGroup._id);
				resolve({ status: 201, message: 'Group created!', id:newGroup._id })
			})
			.catch(err => {
				if (err.code == 11000) {
					reject({ status: 409, message: 'Group Already Registered !'});
				} else {
					reject({ status: 500, message: 'Internal Server Error !' });
				}
			});
		});
