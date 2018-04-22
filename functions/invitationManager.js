'use strict';

const group = require('../models/group');
const user = require('../models/user');

var currentInvites = {};
var codePool = [1111,2222,3333];

// for (var i=0;i<50;i++){
// 	addToPool();
// }
console.log('test11');

// function addToPool(){
// 	do{var tempCode = Math.floor((Math.random() * 10000)) -10;
// 		if (tempCode<1000) tempCode+=1000;
// 	}while((tempCode in currentInvites)||(codePool.includes(tempCode)));
// 	codePool.push(tempCode);
// }

exports.getNewInvite = (groupID) => {
	console.log('test1');

	new Promise((resolve,reject) => {
		console.log('test2');

		var code = codePool.pop();
		console.log('test3');
		currentInvites.code = groupID;
		console.log('test4');
		console.log(code);
		console.log("test222");
		resolve(code);
		console.log('test5');
		// addToPool();
		
		// setTimeout(function(){ 
		// 	delete currentInvites.code;
		// }, 180000);

		
	});
	
}