"use strict";

var Model = require("../models/index.js");

var Users = Model.Bookshelf.Collection.extend({
	model: Model.User
});

var PersonalInfo = Model.Bookshelf.Collection.extend({
	model: Model.PersonalInfo
});

var Exercise = Model.Bookshelf.Collection.extend({
	model: Model.Exercise
});

var ExerciseType = Model.Bookshelf.Collection.extend({
	model: Model.ExerciseType
});

var Plan = Model.Bookshelf.Collection.extend({
	model: Model.Plan
});

var PlanCollection = Model.Bookshelf.Collection.extend({
	model: Model.PlanCollection
});

exports.UserCollection = Users;
exports.PersonalInfoCollection = PersonalInfo;
exports.ExerciseCollection = Exercise;
exports.ExerciseTypeCollection = ExerciseType;
exports.PlanCollection = Plan;
exports.PlanCollectionCollection = PlanCollection;

