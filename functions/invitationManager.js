'use strict';

const group = require('../models/group');
const user = require('../models/user');

var currentInvites = {'1111','2222'};
var codePool = [];

for (var i=0;i<80;i++){
	addToPool();
}

function addToPool(){
	do{var tempCode = Math.floor((Math.random() * 10000)) -10;
		if (tempCode<1000) tempCode+=1000;
	}while((tempCode in currentInvites)||(codePool.includes(tempCode)));
	codePool.push(tempCode.toString());
}

function check(tempCode){
	console.log((tempCode in currentInvites)||(codePool.includes(tempCode)))
}

exports.getNewInvite = (groupID) => 
	
	new Promise((resolve,reject) => {

		var code = codePool.pop();
		addToPool();
		currentInvites[code] = groupID;
		
		resolve(code);
		
		setTimeout(function(){ 
			delete currentInvites[code];
		}, 300000);

		
	});