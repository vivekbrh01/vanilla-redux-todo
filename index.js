let inputText = document.querySelector("input[type='text']");
let ul = document.querySelector(".todo-list");
let ulFooter = document.querySelector(".footer-list");

let allButton = document.querySelector(".all");
let activeButton = document.querySelector(".active");
let completedButton = document.querySelector(".completed");
let clearButton = document.querySelector(".clear");

allButton.addEventListener("click", ({ target }) =>
	handleChange(target.innerText)
);
activeButton.addEventListener("click", ({ target }) =>
	handleChange(target.innerText)
);
completedButton.addEventListener("click", ({ target }) =>
	handleChange(target.innerText)
);
clearButton.addEventListener("click", function () {
	dispatch({ type: "CLEAR_COMPLETED_TODO" });
});

// Store

let id = 0;

let initialState = {
	allTodos: [
		// { text: "Learn DOM", isDone: false, id: id++ },
		// { text: "Learn React", isDone: false, id: id++ },
	],
	activeTab: "All",
};

// Reducers

function allTodosReducer(state = initialState.allTodos, action) {
	switch (action.type) {
		case "ADD_TODO":
			return [...state, { text: action.payload, isDone: false, id: id++ }];
		case "TOGGLE_TODO":
			return state.map((todo) => {
				if (todo.id === action.payload) {
					return {
						...todo,
						isDone: !todo.isDone,
					};
				}
				return todo;
			});
		case "REMOVE_TODO":
			return state.filter((todo) => todo.id !== action.payload);
		case "CLEAR_COMPLETED_TODO":
			return state.filter((todo) => !todo.isDone);
		default:
			return state;
	}
}

function activeTabReducer(state = initialState.activeTab, action) {
	switch (action.type) {
		case "CHANGE":
			return action.payload;
		default:
			return state;
	}
}

// Actions

let addTodoAction = (payload) => ({
	type: "ADD_TODO",
	payload,
});

let toggleTodoAction = (payload) => ({
	type: "TOGGLE_TODO",
	payload,
});

let removeTodoAction = (payload) => ({
	type: "REMOVE_TODO",
	payload,
});

let changeTabAction = (payload) => ({
	type: "CHANGE",
	payload,
});

let clearCompletedAction = () => ({
	type: "CLEAR_COMPLETED_TODO",
});

let rootReducer = Redux.combineReducers({
	allTodos: allTodosReducer,
	activeTab: activeTabReducer,
});
let { dispatch, getState, subscribe } = Redux.createStore(
	rootReducer /* preloadedState */,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Methods

function handleAddTodo({ target, keyCode }) {
	if (keyCode === 13) {
		dispatch(addTodoAction(target.value));
		target.value = "";
	}
}

function handleToggle(id) {
	dispatch(toggleTodoAction(id));
}

function handleDelete(id) {
	dispatch(removeTodoAction(id));
}

function handleClearCompleted() {
	dispatch(clearCompletedAction());
}

function createUI(root, data) {
	root.innerHTML = "";
	data.forEach((todo) => {
		let li = document.createElement("li");
		let span = document.createElement("span");
		let label = document.createElement("label");
		label.for = todo.id;

		let input = document.createElement("input");
		input.addEventListener("click", () => handleToggle(todo.id));
		input.id = todo.id;
		input.type = "checkbox";
		input.checked = todo.isDone;
		span.append(input, label);

		let p = document.createElement("p");
		p.innerText = todo.text;
		let spanDel = document.createElement("span");
		spanDel.innerText = "X";
		spanDel.addEventListener("click", () => handleDelete(todo.id));
		li.append(span, p, spanDel);

		ul.append(li);
	});
}

function filterTodo(active, all) {
	switch (active) {
		case "Active":
			return all.filter((todo) => !todo.isDone);
		case "Completed":
			return all.filter((todo) => todo.isDone);
		default:
			return all;
	}
}

subscribe(() =>
	createUI(ul, filterTodo(getState().activeTab, getState().allTodos))
);

inputText.addEventListener("keyup", handleAddTodo);

function handleChange(newTab) {
	dispatch(changeTabAction(newTab));
}

// [...ulFooter.children].forEach((elm) =>
// 	elm.addEventListener("click", ({ target }) => handleChange(target.innerText))
// );
