const store = Redux.createStore(rootReducer);
const input = document.querySelector("input");
const list = document.querySelector("ul");

function render() {
	const todos = store.getState().todos;
	console.log(todos);
	const html = todos.map(function (todo) {
		return (
			'<li id="' +
			todo.id +
			'" class="' +
			(todo.completed ? "completed" : "") +
			'">' +
			'<div class="view">' +
			'<input class="toggle" type="checkbox" ' +
			(todo.completed ? "checked" : "") +
			"/>" +
			"<label>" +
			todo.text +
			"</label>" +
			'<button class="destroy"></button>' +
			"</div>" +
			"</li>"
		);
	});
	list.innerHTML = html;
}

// function render() {
// 	const todos = store.getState().todos;
// 	console.log(todos);
// 	const html = todos.map(function (todo) {
// 		return `<li id= "${todo.id}" class="${todo.completed ? "completed" : ""}">
//             <div class="view">
//                 <input class="toggle" type="checkbox" ${
// 									todo.completed ? "checked" : ""
// 								} />
//                 <label> ${todo.text} </label>
//                 <button class="destroy"></button>
//             </div>
//         </li>`;
// 	});
// 	list.innerHTML = html;
// }

input.addEventListener("change", function (e) {
	let value = e.target.value;
	store.dispatch(actions.addTodo(value));
	e.target.value = "";
});

list.addEventListener("click", function (e) {
	let target = e.target,
		id;

	switch (target.tagName) {
		case "BUTTON":
			id = target.parentNode.parentNode.id;
			store.dispatch(actions.deleteTodo(id));

			break;
		case "INPUT":
			id = target.parentNode.parentNode.id;
			store.dispatch(actions.completeTodo(id));

			break;
	}
});

render();
store.subscribe(render);
