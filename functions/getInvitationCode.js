'use strict';

// const group = require('../models/group');

exports.getInvitationCode = (req) =>
	new Promise((resolve,reject) => {

		//get a code from 1000 to 9999
		var tempCode = Math.floor((Math.random() * 10000)) -10;
		if (tempCode<1000) tempCode+=1000;


		//two bugs, first it is very slow


		//change the format of group_id:	req.params.getinvitationcode
		
		//put them into a memory session dictinoary

		resolve({status:201, message: tempCode});

		
	});

