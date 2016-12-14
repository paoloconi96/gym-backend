'use strict';

var Schema = {
	user: {
		id: {type: 'increments', nullable: false, primary: true},
		email: {type: 'string', maxlength: 254, nullable: false, unique: true},
		name: {type: 'string', maxlength: 150, nullable: false},
		password: {type: 'string', nullable: false},
		token: {type: 'string', nullable: true},
		id_current_plan_collection: {type: 'integer', nullable: true, references: 'plan_collection.id'},
		created_at: {type: 'dateTime', nullable: false},
		updated_at: {type: 'dateTime', nullable: true},
		active: {type: 'boolean', nullable: false}
	},

	personal_info: {
		id: {type: 'increments', nullable: false, primary: true},
		id_user: {type: 'integer', nullable: false, references: 'user.id'},
		weight: {type: 'numeric', precision: 5, scale: 2, nullable: true},
		height: {type: 'numeric', precision: 3, scale: 2, nullable: true},
		created_at: {type: 'dateTime', nullable: false},
		updated_at: {type: 'dateTime', nullable: true},
	},

	plan_collection: {
		id: {type: 'increments', nullable: false, primary: true},
		id_user: {type: 'integer', nullable: false, references: 'user.id'},
		editing: {type: 'boolean', nullable: false}
		created_at: {type: 'dateTime', nullable: false},
		updated_at: {type: 'dateTime', nullable: true}
	},

	plan: {
		id: {type: 'increments', nullable: false, primary: true},
		id_plan_collection: {type: 'integer', nullable: false, references: 'plan_collection.id'},
		title: {type: 'string', maxlength: 150, nullable: false},
		created_at: {type: 'dateTime', nullable: false},
		updated_at: {type: 'dateTime', nullable: true}
	},

	exercise_type: {
		id: {type: 'increments', nullable: false, primary: true},
		title: {type: 'string', nullable: false, maxlength: 100},
		type: {type: 'integer', nullable: false},
		id_user: {type: 'integer', nullable: true, references: 'user.id'},
		created_at: {type: 'dateTime', nullable: false},
		updated_at: {type: 'dateTime', nullable: true}
	},

	exercise: {
		id: {type: 'increments', nullable: false, primary: true},
		length: {type: 'numeric', precision: 5, scale: 2, nullable: true},
		weight: {type: 'integer', nullable: true},
		repetition: {type: 'integer', nullable: true},
		set_number: {type: 'integer', nullable: true},
		id_excercise_type: {type: 'integer', nullable: false, references: 'exercise_type.id'},
		id_plan: {type: 'integer', nullable: false, references: 'plan.id'},
		created_at: {type: 'dateTime', nullable: false},
		updated_at: {type: 'dateTime', nullable: true}
	}


};

module.exports = Schema;






// categories: {
// 	id: {type: 'increments', nullable: false, primary: true},
// 	name: {type: 'string', maxlength: 150, nullable: false, unique: true}
// },
// // html: {type: 'text', fieldtype: 'medium', nullable: false},
// blogposts: {
// 	id: {type: 'increments', nullable: false, primary: true},
// 	user_id: {type: 'integer', nullable: false},
// 	category_id: {type: 'integer', nullable: false},
// 	title: {type: 'string', maxlength: 150, nullable: false},
// 	html: {type: 'string', maxlength: 150, nullable: false},
// 	created_at: {type: 'dateTime', nullable: false},
// 	updated_at: {type: 'dateTime', nullable: true}
// },

// tags: {
// 	id: {type: 'increments', nullable: false, primary: true},
// 	name: {type: 'string', nullable: false, unique: true}
// },

// // A table for many-to-many relation between tags table & posts table
// posts_tags: {
// 	id: {type: 'increments', nullable: false, primary: true},
// 	post_id: {type: 'integer', nullable: false, references: 'blogposts.id'},
// 	tag_id: {type: 'integer', nullable: false, references: 'tags.id'}
// }

















