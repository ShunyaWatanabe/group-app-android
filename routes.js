'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const config = require('./config/config.json');
const user = require('./models/user');
const group = require('./models/group');

const checkingTokens = require('./functions/checkTokens');
const profile = require('./functions/profile');
const register = require('./functions/register');
// const login = require('./functions/login');
const create = require('./functions/create');
const invite = require('./functions/invitationManager');

//Push notifications
let FCM = require('fcm-node');
let fcm = new FCM(config.serverKey);

module.exports = router => {

	//Creates new access token if needed
	function createResponse(result, response){
		if(result.status == 203){
			response.token = jwt.sign(result, config.secret, { expiresIn: 20 });
		}
		return response;
	}


	//for non path
	router.get('/', (req, res) => res.end('Works!'));


	//push not
	router.get('/push', (req,res) => {

	    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
	        registration_ids: ['eSobx6Kftco:APA91bG6X3w18PdYKaEs2GNeoJLEwyCUvkLErRZcmBUMZQpW37Kq7k8LImcnGR_Sj6QLLWU5mEQQBTrE9VvhBGrVFNAbjPiFYwaVRs0VBvgCftkNwRztessYxzg3VftWdlZK5DCqoLxK',
	        'dCjUpAl8ItU:APA91bGjlOmHVqFKDTMoDupMUmnkdrshLx_OfEcbyzRbuB_KsMlNU57oUOlqzCNzKnKNOOSreSgMxfEYfKI4TYjSgj1jr29R0AywjARHKeaKQbMX_2WHFmVI2MjL65vlAhivH2_norOL'], //refistration_token
	        //at most 1000 registration tokens
	        //collapse_key

	        // notification: {
	        //     title: 'Title of your push notification',
	        //     body: 'Body of your push notification'
	        // },

	        data: {  //you can send only notification or only data(or include both)
	            title: 'Title of your push notification',
	            text: 'Body of your push notification',
	            my_key: 'my value',
	            my_another_key: 'my another value'
	        }
	    };

	    fcm.send(message, function(err, response){
	        if (err) {
	            console.log("Something has gone wrong!");
	            res.status(400).json({ message: "Error" });
	        } else {
	            console.log("Successfully sent with response: ", response);
	            res.status(200).json({ message: "Sent"});
	        }
	    });
	});


	// //user login operation
	// router.post('/users/login', (req, res) => {

	// 	const credentials = auth(req);

	// 	if (!credentials) {

	// 		res.status(400).json({ message: 'Invalid Request !' });

	// 	} else {

	// 		login.loginUser(credentials.private_key, req.body.fcm_token)

	// 		.then(result => {

	// 			const token = jwt.sign(result, config.secret, { expiresIn: 20 });
	// 			res.status(result.status).json({ message: result.message, token: token, refresh_token: result.refresh_token });

	// 		})

	// 		.catch(err => res.status(err.status).json({ message: err.message }));
	// 	}
	// });

	//relogin
	router.post('/users/relogin', (req, res) => {

		//var ob = JSON.stringify(req.body);

		checkingTokens.checkTokens(req)

			.then(result => {

				let response = { message: result.message};

				response = createResponse(result, response);

				res.status(result.status).json(response);
			})

			.catch(err => res.status(err.status).json({ message: err.message }));

	});

	//add a new user
	router.post('/users/signup', (req, res) => {

		console.log("Name: " + req.body.name); 
		const name = req.body.name;
		
		if (!name  || !name.trim()) {
			console.log("error");
			res.status(400).json({message: 'Invalid Request !'});
		} 

		//WE NEED TO LOG IN BY PRIVATE KEY HERE

		// else if (user.find({private_key:name}).length!=0){
		// 	//log in private key
		// }
		
		else {
			register.registerUser(req)
			.then(result => {
				const token = jwt.sign(result, config.secret, { expiresIn: 20 });
				console.log("PRIVATE KEY2:",result.private_key);
				res.status(result.status).json({ message: result.message, token: token, refresh_token: result.refresh_token, private_key: result.private_key})
			})
			.catch(err => {
				res.status(err.status).json({ message: err.message});
			});
		}
	});

	//get the user profile details
	router.get('/users/:private_key', (req,res) => {
		console.log("Calling get profile");
		checkingTokens.checkTokens(req)

			.then(result => {
				console.log("After tokens");
				console.log("Params",req.params.private_key);
				profile.getProfile(req.params.private_key)

				.then(result1 =>{
					console.log("Found him");

					 result1 = createResponse(result, result1);

					 res.status(result.status).json(result1);
				})

				.catch(err1 => res.status(err1.status).json({ message: err1.message }));
			})
			//this does not work. WE HAVE TO FIX EVERYTHING
			.catch(err => res.status(err.status).json({ message: err.message }));

	});


	// router.get('/users/search/:query', (req,res) => {

	// 		checkingTokens.checkTokens(req)

	// 		.then(result => {

	// 			search.users(req.params.query)

	// 			.then(result1 =>{

	// 				result1 = createResponse(result, result1);

	// 				res.status(result.status).json(result1);
	// 			})

	// 			.catch(err1 => res.status(err1.status).json({ message: err1.message }));

	// 		})

	// 		.catch(err => res.status(err.status).json({ message: err.message }));

	// });





	//create or join group operation
	router.post('/groups/joingroup', (req, res) => {

		//check if code is invitation
			//if yes, find group by invitation in the db and put the user inside
			//if no. response and ask user for location data 
	
		create.createGroup(req.body.user)
		.then(result => {
			res.status(result.status).json({ message: result.message});
		})
		.catch(err => res.status(err.status).json({ message: err.message }));
	
	});


	//change Username
	router.post('/users/changeUserName', (req, res) => {
		console.log("router to changeUserName");

		user.findOne({'private_key':req.body[1]},function(err,doc){
			if (err) console.log(err);
			doc.name = req.body[0];
			doc.save(function(err){if (err) console.log(err);});
			res.status(201).json({message:req.body[0]});
		})
		.catch(err => res.status(err.status).json({ message: err.message }));
	});


	//download group upon login
	router.get('/groups/:getgroup', (req, res) =>{
		console.log("router to getgroup");

		var groupslist = [];


		new Promise((resolve,reject)=>{



			user.findOne({'private_key':req.params.getgroup},function(err,doc){

				if (err) console.log(err);

				console.log("doc");
				console.log(typeof doc);
				doc.groups_participated.forEach(function(groupID){

					console.log("groupID");
					console.log(groupID);
					group.findById(groupID, "_id name",function(err,groupObject){
						console.log("groupObject");
						console.log(groupObject);
						if (err) console.log(err);
						groupslist.push(groupObject);
						console.log("groupslist");
						console.log(groupslist);
						console.log(typeof groupslist);
						console.log(typeof groupslist[0]);
					});
				});
				
			});
			

		})
		.then(resolve => {
			res.status(201).json({message: "Get group succeed!",groups: groupslist});	
		})
		.catch(err=>{
			res.status(err.status).json({ message: err.message });

		});





	//get invitation code
	router.get('/groups/invite/:getinvitationcode', (req, res) =>{
		console.log("router to invitation");
		
		invite.getNewInvite(req.params.getinvitationcode)
		.then(result =>{
			res.status(201).json({message: result});
		})
		.catch(err =>{
			res.status(err.status).json({ message: err.message })
		})
	});

	//user leave group
	router.post('/groups/leavegroup', (req, res) =>{
		console.log("router to leavegroup");
		user.findOne({'private_key':req.body[0]},function(err,doc){
			if (err) console.log(err);
			doc.groups_participated = doc.groups_participated.filter(function(item){
				return !item.equals(req.body[1]);
			});
			doc.save(function(err){if (err) console.log(err);});
			res.status(201).json({message: "remove succeed!" ,id: req.body[1]});	
		})
		.catch(err=> {
			res.status(err.status).json({ message: err.message })
		});
	});



	


}
