'use strict';

const user = require('../models/user');
const group = require('../models/group');


	

exports.changeUserName = (req) =>
	new Promise((resolve,reject) => {
		



		user.find({'private_key':req.body[1]},function(err,doc){
					console.log(req.body[0]);
				if (err) console.log(err);
					console.log(req.body[1]);
				doc.name = req.body[0];
					console.log('test4');
				doc.save();
					console.log('test5');

			});		




	});
