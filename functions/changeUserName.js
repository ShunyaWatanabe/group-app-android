'use strict';

const user = require('../models/user');
const group = require('../models/group');


	

exports.changeUserName = (req) =>
	new Promise((resolve,reject) => {
			user.findOne({'private_key':'WeK7QHF944gc'},function(err,doc){
					
				if (err) console.log(err);
					
				doc.name = req.body[0];
				console.log("ddd");
				console.log(doc);
				console.log("eee");
				doc.save(function(err){
					if (err) console.log('9999');
				});
				console.log('test5');

			});		




	});
