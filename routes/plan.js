"use strict";

var PlanController = {},
	Promise = require("bluebird"),
	Collections = require("../data/collection.js"),
	PlanService = require("../services/planService.js");

PlanController.setWeightHeight = function(req, res) {
	PlanService.setWeightHeight(req, res)
		.then(function (result) {
			var reply = {
				status: 'ok',
				id: result.id
			}

			res.status(200).json(reply);
		})
		.catch(function (err) {
			res.status(500).json({status: 'ko', code: 0, message: err});
		});
}

PlanController.createPlan = function(req, res) {
	PlanService.createPlan(req, res)
		.then(function (result) {
			var reply = {
				status: 'ok',
				id: result.id
			}
			
			res.status(200).json(reply);
		})
		.catch(function (err) {
			res.status(500).json({status: 'ko', code: 0, message: err});
		});
}

PlanController.toggleEditing = function(req, res) {
	PlanService.toggleEditing(req, res)
		.then(function (result) {
			var reply = {
				status: 'ok',
				id: result.id
			}
			
			res.status(200).json(reply);
		})
		.catch(function (err) {
			res.status(500).json({status: 'ko', code: 0, message: err});
		});
}

PlanController.createExercise = function(req, res) {
	PlanService.createExercise(req, res)
		.then(function (result) {
			var reply = {
				status: 'ok',
				id: result.id
			}
			
			res.status(200).json(reply);
		})
		.catch(function (err) {
			res.status(500).json({status: 'ko', code: 0, message: err});
		});
}

module.exports = PlanController;