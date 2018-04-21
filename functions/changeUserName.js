'use strict';

const user = require('../models/user');
const group = require('../models/group');


// function changeUserName = (req) => 
// 		new Promise((resolve,reject)=>{
		
// 			user.find({'private_key':req.body[1]},function(err,doc){
// 					console.log('test2');
// 				if (err) console.log(err);
// 					console.log('test3');
// 				doc.name = req.body[2];
// 					console.log('test4');
// 				doc.save();
// 					console.log('test5');

// 			});		
// 		});
	

exports.changeUserName = (req) =>
	new Promise((resolve,reject) => {
		console.log(rep.body);	
	});
