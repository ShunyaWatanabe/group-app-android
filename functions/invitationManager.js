'use strict';

const group = require('../models/group');
const user = require('../models/user');

var currentInvites = {};
var codePool = [1111,2222,3333];

for (var i=0;i<50;i++){
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
		



		var code = codePool.pop();
		console.log('test1');
		currentInvites[code] = groupID;
		console.log(currentInvites);
		console.log(code);
		console.log("test2");
		resolve(code);
		
		addToPool();
		console.log('test3');
		
		// setTimeout(function(){ 
		// 	delete currentInvites.code;
		// }, 180000);

		
	});
	
