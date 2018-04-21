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
			console.log(req.params);
			resolve({status:201,message:"sucessfully get group",groups:doc.groups_participated });

		});		
	});
