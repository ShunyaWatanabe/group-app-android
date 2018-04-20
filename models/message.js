'use strict';

const config = require('../config/config.json');

const mongoose = require('mongoose');

const user 	 = require('../models/user');
const group	 = require('../models/group');

const Schema = mongoose.Schema;

const messageSchema = mongoose.Schema({

	group: {type: Schema.Types.ObjectId, required: true},
	text: {type: String, required: true},
	sender:{type: Schema.Types.ObjectId, ref: 'user'},
	created_at: String
	});


mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(config.db);
module.exports = connection.model('message', messageSchema);
