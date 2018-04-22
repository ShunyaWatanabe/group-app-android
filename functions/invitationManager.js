'use strict';

const group = require('../models/group');
const user = require('../models/user');

var currentInvites = {};
var codePool = [];

for (var i=0;i<5,i++){
	addToPool();
}

function addToPool(){
	do{var tempCode = Math.floor((Math.random() * 10000)) -10;
		if (tempCode<1000) tempCode+=1000;
	}while((tempCode in currentInvites)||(codePool.includes(tempCode)));
	codePool.push(tempCode.toString());
}

exports.getNewInvite = (groupID) => 
	
	new Promise((resolve,reject) => {

		console.log("new round --------------------");
		console.log("status is: ");
		console.log(codePool);
		console.log(currentInvites);

		var code = codePool.pop();
		
		currentInvites[code] = groupID;
		
		console.log("after opertaion-----");
		console.log(currentInvites);
		console.log(codePool);
		
		resolve(code);

		
		
		addToPool();

		console.log("add one------");
		console.log(codePool);
		console.log("finish----------");
		
		// setTimeout(function(){ 
		// 	delete currentInvites.code;
		// }, 180000);

		
	});
	
