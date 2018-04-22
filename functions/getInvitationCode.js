'use strict';

// const group = require('../models/group');

exports.getInvitationCode = (req) =>
	new Promise((resolve,reject) => {

		var tempCode = Math.floor((Math.random() * 10000) );


		//change the format of group_id:	req.params.getinvitationcode
		
		//put them into a memory session dictinoary

		resolve({status:201, message: tempCode});

		
	});

