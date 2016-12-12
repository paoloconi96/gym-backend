"use strict";

var Model = require("../models/index.js");

var Users = Model.Bookshelf.Collection.extend({
	model: Model.User
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

exports.UserCollection = Users;

