'use strict';

const config = require('../config/config.json');

const mongoose = require('mongoose');

const group 	= 	require('../models/group');
const message 	= 	require('../models/message');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({

	name: String,
	created_at: String,
	private_key: String,
	refresh_token: String,
	token: String,

	// groups_participated: [{type: Schema.Types.ObjectId, ref: 'group'}]
	groups_participated: [String]
});

mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(config.db);
module.exports = connection.model('user', userSchema);
