'use strict';

const user = require('../models/user');
const group = require('../models/group');


	

exports.changeUserName = (req) =>
	new Promise((resolve,reject) => {
		console.log(req.body[0]);
		console.log(req.body[1]);

		user.find({'private_key':'WeK7QHF944gc'},function(err,doc){
					
				if (err) console.log(err);
					
				doc[0].name = req.body[0];
				console.log("ddd");
				console.log(doc[0]);
				console.log("eee");
				//doc.save();
				console.log('test5');

			});		




	});
