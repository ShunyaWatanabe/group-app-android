'use strict';

const user = require('../models/user');
const group = require('../models/group');

exports.getGroup = (req) =>
	new Promise((resolve,reject) => {

		user.findOne({'private_key':req.params.getgroup},function(err,doc){
			console.log("test00");
			if (err) console.log(err);
			console.log(req.params.getgroup);
			console.log(doc);
			
			
			resolve({status:201,message:"sucessfully get group",groups:doc.groups_participated });

		});		
	});
