'use strict';

const user = require('../models/user');
const group = require('../models/group');

exports.getGroup = (req) =>
	new Promise((resolve,reject) => {

		user.findOne({'private_key':req.params.private_key},function(err,doc){
			console.log("test00");
			if (err) console.log(err);
			console.log(doc);
			console.log(req.params.private_key);
			var temp = doc.groups_participated;
			resolve({status:201,message:"sucessfully get group" });

		});		
	});
