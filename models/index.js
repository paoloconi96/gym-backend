"use strict";

var moment = require("moment");

var Knex = require("knex")({
	client: "pg",
	connection: {
		host: "localhost",
		user: "paolo",
		password: "paolo",
		database: "gym_base"
	}
});

var Bookshelf = require("bookshelf")(Knex);
Bookshelf.plugin("visibility");

var User = Bookshelf.Model.extend({
	tableName: "user",
	hasTimestamps: true
});
exports.User = User;

exports.Bookshelf = Bookshelf;
