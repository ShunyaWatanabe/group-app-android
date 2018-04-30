'use strict';

const message = require('../models/message');
const group = require('../models/group');
const user = require('../models/user');

exports.ioConnections = io => {

	io.on('connection', function(socket){
		console.log('user connected');

		// join a group
		socket.on('join group', function(object){ 
		    console.log("room: " + object.groupId); 
		    socket.join(object.groupId);
		    io.local.emit('join group', "joined"); //send message to user
		});

		// send a message to the group
		socket.on('send message', function(object){ 
		    console.log(' smessage: ' + object.message); 
		    console.log(object);
		    socket.broadcast.to(object.groupId).emit('send message', {message: object.message}); 
		    updateGroupConversation(object);
		});

		socket.on('disconnect', function(){
		    console.log('user disconnected');
		});

	});

}



function updateGroupConversation(object){

	try{
		group.findOne({_id:object.groupId},function(err,groupObject){
			
			groupObject.conversation.push(object.message);
			groupObject.save();
		});

	}catch(err){console.log(err.message);}

}










