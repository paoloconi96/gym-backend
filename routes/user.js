"use strict";

var UserController = {},
	Bcrypt = require("bcrypt"),
	Crypto = require("crypto"),
	Promise = require("bluebird"),
	Collections = require("../data/collection.js");

UserController.getAll = function (req, res) {
	Collections.UserCollection.forge()
	// .query(function (qb) {
	// 	qb.where("id", "<", "8").andWhere("name", "=", "desmond");
	// })
	.fetch()
	.then(function (result) {
		result = result.map(removePasswordFromUserData);
		res.status(200).json(result);
	})
	.catch(function (err) {
		res.status(500).json(err);
	});
};

UserController.create = function (req, res) {
	var salt = Bcrypt.genSaltSync(12);
	var hash = Bcrypt.hashSync(req.body.password, salt);

	Collections.UserCollection.forge()
	.create({
		name: req.body.name,
		email: req.body.email.toLowerCase(),
		password: hash,
		active: true
	})
	.then(function (result) {
		var reply = {
			id: result.id,
			name: result.name,
			email: result.email
		}
		res.status(200).json(reply);
	})
	.catch(function (err) {
		// l'errore 23505 è una unique violation, quindi l'utente esiste già
		if(err.code === '23505') {
			res.status(200).json({status: 'ko', code: 1, message: 'Utente già registrato.'});
		} else {
			res.status(500).json(err);
		}
	});
};

UserController.login = function (req, res) {
	Collections.UserCollection.forge()
	.query(function (qb) {
		qb.where("email", "=", req.body.email.toLowerCase());
	})
	.fetchOne()
	.then(function (user) {
		if (user) {
			var isPassword = Bcrypt.compareSync(req.body.password, user.get("password"));
			if (isPassword) {
				if (user.get("token")) {
					return Promise.resolve(user);
				} else {
					// No token
					var randomBytes = Promise.promisify(Crypto.randomBytes);

					return randomBytes(48)
					.then(function (buf) {
						var aToken = buf.toString("hex");
						// set the modified data before saving
						// user.set({token: aToken});
						return user.save({token: aToken});
					});
				}
			} else {
				return res.status(200).json({status: 'ko', code: 10, message: 'Password errata.'});
			}
		} else {
			return res.status(200).json({status: 'ko', code: 11, message: 'Utente inesistente.'});
		}
	})
	.then(function (user) {
		user = removePasswordFromUserData(user);

		var reply = {
			id: user.id,
			email: user.email,
			name: user.name,
			id_current_plan: user.id_current_plan,
			token: user.token
		}

		res.status(200).json(reply);
	})
	.catch(function (err) {
		res.status(500).json({status: 'ko', message: err});
	});
};

UserController.logout = function (req, res) {
	Collections.UserCollection.forge()
	.query(function (qb) {
		qb.where("token", "=", req.body.token);
	})
	.fetchOne()
	.then(function (user) {
		user.save({token: null});
		res.status(200).json({message: "logout"});
	})
	.catch(function (err) {
		res.status(500).json({error: err.message});
	});
};

UserController.getUser = function (req, res) {
	Collections.UserCollection.forge()
	.query(function (qb) {
		qb.where("id", "=", req.params.id);
	})
	.fetchOne()
	.then(function (result) {
		if (!result) {
			res.status(404).json({});
		} else {
			result = removePasswordFromUserData(result);
			res.status(200).json(result)
		}
	})
	.catch(function (err) {
		res.status(500).json(err);
	});
};

UserController.update = function (req, res) {
	Collections.UserCollection.forge()
	.query(function (qb) {
		qb.where("id", "=", req.params.id);
	})
	.fetchOne({
		require: true
	})
	.then(function (user) {
		if (!user) {
			res.status(404).json({});
		} else {
			user
			.save({
				name: req.body.name || user.get("name"),
				email: req.body.email || user.get("email")
			})
			.then(function (result) {
				result = removePasswordFromUserData(result);
				res.status(200).json(result);
			})
			.catch(function (err) {
				res.status(500).json(err);
			});
		}
	})
	.catch(function (err) {
		res.status(500).json(err);
	});
};

UserController.destroy = function (req, res) {
	Collections.UserCollection.forge()
	.query(function (qb) {
		qb.where("id", "=", req.params.id);
	})
	.fetchOne({
		require: true
	})
	.then(function (user) {
		if (!user) {
			res.status(404).json({});
		} else {
			user
			.save({
				active: false
			})
			.then(function () {
				res.status(200).json({});
			})
			.catch(function (err) {
				res.status(500).json(err);
			});			
		}
	})
	.catch(function (err) {
		res.status(500).json(err);
	})
};

var removePasswordFromUserData = function (user) {
	var userObject = user.toJSON();
	if (userObject.hasOwnProperty("password")) {
		delete(userObject.password);
	}
	return userObject;
};

module.exports = UserController;