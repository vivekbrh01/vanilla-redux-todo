const actions = {
	addTodo: function (text) {
		return { type: types.ADD_TODO, text };
	},

	deleteTodo: function (id) {
		return { type: types.DELETE_TODO, id };
	},

	editTodo: function (id, text) {
		return { type: types.EDIT_TODO, id, text };
	},

	completeTodo: function (id) {
		return { type: types.COMPLETE_TODO, id };
	},

	completeALL: function () {
		return { type: types.COMPLETE_ALL };
	},

	clearCompleted: function () {
		return { type: types.CLEAR_COMPLETED };
	},
};
