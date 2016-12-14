"use strict";

var moment = require("moment");

var Knex = require("knex")({
	client: "pg",
	connection: {
		host: "localhost",
		user: "paolo",
		password: "MACPAOLO",
		database: "gym_base"
	}
});

var Bookshelf = require("bookshelf")(Knex);
Bookshelf.plugin("visibility");

var User = Bookshelf.Model.extend({
	tableName: "user",
	hasTimestamps: true
});

var PersonalInfo = Bookshelf.Model.extend({
	tableName: "personal_info",
	hasTimestamps: true
});

var Exercise = Bookshelf.Model.extend({
	tableName: "exercise",
	hasTimestamps: true
});

var ExerciseType = Bookshelf.Model.extend({
	tableName: "exercise_type",
	hasTimestamps: true
});

var Plan = Bookshelf.Model.extend({
	tableName: "plan",
	hasTimestamps: true
});

var PlanCollection = Bookshelf.Model.extend({
	tableName: "plan_collection",
	hasTimestamps: true
});


exports.User = User;
exports.PersonalInfo = PersonalInfo;
exports.Exercise = Exercise;
exports.ExerciseType = ExerciseType;
exports.Plan = Plan;
exports.PlanCollection = PlanCollection;

exports.Bookshelf = Bookshelf;
