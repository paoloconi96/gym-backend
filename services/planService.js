"use strict";

var PlanService = {},
	Promise = require("bluebird"),
	Collections = require("../data/collection.js");

PlanService.setWeightHeight = function(req, res) {
	return Collections.PersonalInfoCollection.forge()
		.create({
			id_user: req.headers.user_id,
			weight: req.body.weight,
			height: req.body.height
		});
}

PlanService.createPlan = function(req, res) {
	// cerco se esiste già una plancollection in modifica
	Collections.PlanCollectionCollection.forge()
		.query(function (qb) {
			qb.where("editing", "=", 1);
		})
		.fetchOne()
		.then(function(planColEditing) {
			// se esiste aggiungo il plan su quella altrimenti ne creo una
			if(planColEditing) {
				var planData = {
					id_plan_collection: planColEditing ///////////////////////////////////////////////////////////////////
					title: req.body.title
				}
				return PlanService.createPlanSingle(planData);
			} else {
				return Collections.PlanCollectionCollection.forge()
					.create({
						id_user: req.headers.user_id,
						editing: 1
					})
					.then(function() {
						var planData = {
							id_plan_collection: planColEditing ///////////////////////////////////////////////////////////////////
							title: req.body.title
						}
						return PlanService.createPlanSingle(planData);
					});
			}
		})
		.catch(function (err) {
			res.status(500).json({status: 'ko', message: err});
		});
}

PlanService.createPlanSingle = function(body) {
	return Collections.PlanCollection.forge()
		.create({
			id_plan_collection: body.id_plan_collection,
			title: body.title
		});
}


module.exports = PlanService;