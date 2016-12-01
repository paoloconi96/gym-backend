"use strict";

var Model = require("../models/index.js");

var Users = Model.Bookshelf.Collection.extend({
	model: Model.User
});
exports.UserCollection = Users;

