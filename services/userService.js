"use strict";

var UserService = {},
	Bcrypt = require("bcrypt"),
	Crypto = require("crypto"),
	Promise = require("bluebird"),
	Collections = require("../data/collection.js");

UserService.login = function (req, res) {
	// Collections.UserCollection.forge()
	// .query(function (qb) {
	// 	qb.where("id", "=", req.header.id);
	// })
	// .fetchOne()
	// .then(function (user) {
	// 	if (user) {
	// 		var isPassword = Bcrypt.compareSync(req.body.password, user.get("password"));
	// 		if (isPassword) {
	// 			if (user.get("token")) {
	// 				return Promise.resolve(user);
	// 			} else {
	// 				// No token
	// 				var randomBytes = Promise.promisify(Crypto.randomBytes);

	// 				return randomBytes(48)
	// 				.then(function (buf) {
	// 					var aToken = buf.toString("hex");
	// 					// set the modified data before saving
	// 					// user.set({token: aToken});
	// 					return user.save({token: aToken});
	// 				});
	// 			}
	// 		} else {
	// 			return res.status(200).json({status: 'ko', code: 10, message: 'Password errata'});
	// 		}
	// 	} else {
	// 		return res.status(200).json({status: 'ko', code: 11, message: 'Utente inesistente'});
	// 	}
	// })
	// .then(function (user) {
		
	// })
	// .catch(function (err) {
		
	// });
};

module.exports = UserService;