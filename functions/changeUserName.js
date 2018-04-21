'use strict';

const user = require('../models/user');
const group = require('../models/group');


	

exports.changeUserName = (req) =>
	new Promise((resolve,reject) => {
		

		user.find({'private_key':req.body[1]},function(err,doc){
					
				if (err) console.log(err);
					
				doc.name = req.body[0];
				console.log("ddd");
				console.log(doc);
				console.log("eee");
				//doc.save();
				console.log('test5');

			});		




	});
