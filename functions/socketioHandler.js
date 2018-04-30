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
		    socket.broadcast.to(object.groupId).emit('send message', {message: object.message}); 
		    updateGroupConversation(object);
		});

		socket.on('disconnect', function(){
		    console.log('user disconnected');
		});

	});

}

function updateGroupConversation(object){
	let query = { '_id' : object.groupId};
	let newGroup = group.findOne(query);
	if (newGroup){
		// newGroup.conversation.push(object.message);
		newGroup.save();
	}
}

function addToDB(object){
	let date = new Date();
	let currentTime = date.getTime();

	const newMessage = new message({
		group: object.groupId,
		text: object.message,
		sender: object.sender,
		created_at: currentTime
	});
				
	newMessage.save();
}

