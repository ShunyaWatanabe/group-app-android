'use strict';

const config = require('../config/config.json');

const mongoose = require('mongoose');

const user = require('../models/user');
const message = require('../models/message');

const Schema = mongoose.Schema;

const groupSchema = mongoose.Schema({

	name: String,
	members:[{type: Schema.Types.ObjectId, ref: 'user'}],
	conversation: [{type: Schema.Types.ObjectId, ref: 'message'}],
	created_at: String
	});

mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(config.db);
module.exports = connection.model('group', groupSchema);
