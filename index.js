let inputText = document.querySelector("input[type='text']");
let ul = document.querySelector(".todo-list");

// Store

let id = 0;

let initialState = {
	allTodos: [
		{ text: "Learn DOM", isDone: false, id: id++ },
		{ text: "Learn React", isDone: false, id: id++ },
	],
	activeTab: "all",
};

// Reducers

function reducer(state = initialState, action) {
	switch (action.type) {
		case "ADD_TODO":
			return {
				...state,
				allTodos: [
					...state.allTodos,
					{ text: action.text, isDone: false, id: id++ },
				],
			};
		case "TOGGLE_TODO":
			return {
				...state,
				allTodos: state.allTodos.map((todo) => {
					if (todo.id === action.id) {
						return {
							...todo,
							isDone: !todo.isDone,
						};
					}
					return todo;
				}),
			};
		case "REMOVE_TODO":
			return 0;
		default:
			break;
	}
}

// Actions

let addTodoAction = (text) => ({
	type: "ADD_TODO",
	text,
});

let toggleTodoAction = (id) => ({
	type: "TOGGLE_TODO",
	id,
});

let { dispatch, getState, subscribe } = Redux.createStore(
	reducer /* preloadedState */,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Methods

function handleAddTodo({ target, keyCode }) {
	if (keyCode === 13) {
		dispatch(addTodoAction(target.value));
	}
}

function handleToggle(id) {
	dispatch(toggleTodoAction(id));
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
		li.append(span, p, spanDel);

		ul.append(li);
	});
}

subscribe(() => createUI(ul, getState().allTodos));

inputText.addEventListener("keyup", handleAddTodo);
