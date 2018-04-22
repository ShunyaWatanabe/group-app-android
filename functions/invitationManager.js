'use strict';

const group = require('../models/group');
const user = require('../models/user');

var currentInvites = {};
var codePool = ['1111','2222','3333'];

// for (var i=0;i<5;i++){
// 	addToPool();
// }

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

		console.log("new round --------------------");
		console.log("status is: ");
		console.log(codePool);
		console.log(currentInvites);

		console.log('check');
		check('1111');check('2222');check('3333');
		console.log('checkfninish');

		var code = codePool.pop();
		
		currentInvites[code] = groupID;

	
		
		console.log("after opertaion-----");
		console.log(currentInvites);
		console.log(codePool);

		console.log('check');
		check('1111');check('2222');check('3333');
		console.log('checkfninish');
		
		resolve(code);
		
		addToPool();

		console.log("add one------");
		console.log(codePool);
		console.log("finish----------");
		
		// setTimeout(function(){ 
		// 	delete currentInvites.code;
		// }, 180000);

		
	});
	
