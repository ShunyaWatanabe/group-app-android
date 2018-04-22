'use strict';

const user = require('../models/user');

exports.getGroup = (req) =>
	new Promise((resolve,reject) => {

		user.findOne({'private_key':req.params.getgroup},function(err,doc){
			if (err) console.log(err);
			
			resolve({status:201,message:"sucessfully get group",groups:doc.groups_participated });

		});		
	});
