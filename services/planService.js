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
	return Collections.PlanCollectionCollection.forge()
		.query(function (qb) {
			qb.where("editing", "=", 1);
			qb.where("id_user", "=", req.headers.user_id);
		})
		.fetchOne()
		.then(function(planColEditing) {
			// se esiste aggiungo il plan su quella altrimenti ne creo una
			if(planColEditing) {
				var planData = {
					id_plan_collection: planColEditing.id,
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
							id_plan_collection: planColEditing.id,
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

PlanService.toggleEditing = function(req, res) {
	// cerco se esiste già una plancollection in modifica
	return Collections.PlanCollectionCollection.forge()
		.query(function (qb) {
			qb.where("editing", "=", !req.body.editing);
			qb.where("id_user", "=", req.headers.user_id);
		})
		.fetchOne()
		.then(function(planCollection) {
			// se esiste aggiungo il plan su quella altrimenti ne creo una
			console.log(planCollection);
			if(planCollection) {
				return planCollection.set('editing', req.body.editing).save();
			} else {
				return 1;
			}
		})
		.catch(function (err) {
			res.status(500).json({status: 'ko', message: err});
		});
}

PlanService.createExercise = function(req, res) {
	// controllo se l'exercise_type che sto cercando esiste
	return Collections.ExerciseTypeCollection.forge()
		.query(function (qb) {
			qb.where("id", "=", req.body.id_exercise_type);
		})
		.fetchOne()
		.then(function(exercise_type) {
			// se esiste creo l'esercizio con l'id che ho ottenuto
			if(exercise_type) {
				return PlanService.performCreateExercise(req, res, exercise_type.id);
			} else {
				// altrimenti creo un exercise_type e quindi faccio come sopra
				return Collections.ExerciseTypeCollection.forge()
					.create({
						title: req.body.title,
						type: req.body.type,
						id_user: req.headers.user_id,
					})
					.then(function(exercise_type) {
						return PlanService.performCreateExercise(req, res, exercise_type.id);
					});
			}
		})
		.catch(function (err) {
			res.status(500).json({status: 'ko', message: err});
		});
}

PlanService.performCreateExercise = function(req, res, id_exercise_type) {
	// creo l'esercizio con le informazioni che mi sono state inviate
	return Collections.ExerciseCollection.forge()
		.create({
			length: req.body.length,
			weight: req.body.weight,
			repetition: req.body.repetition,
			set_number: req.body.set_number,
			id_exercise_type: id_exercise_type,
			id_plan: req.params.plan_id
		}).catch(function(err) {

		});
}


module.exports = PlanService;











