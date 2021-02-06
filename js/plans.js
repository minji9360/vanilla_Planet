function slidePlanDetail(index) {
	const content = document.querySelector("#detailBox" + index);
	const downButton = document.querySelector("#moreDown" + index);
	const upButton = document.querySelector("#moreUp" + index);

	content.classList.toggle("hidden");
	downButton.classList.toggle("hidden");
	upButton.classList.toggle("hidden");
}

/* data */
function updateImportant(i) {
	const important = document.querySelector("#important" + i);
	const grayButton = document.querySelector("#importantGray" + i);
	const colorButton = document.querySelector("#importantColor" + i);

	if (important.checked === true) {
		important.value = false;
		changeBtn(colorButton, grayButton);
	} else {
		important.value = true;
		changeBtn(grayButton, colorButton);
	}
}

function loadImportant(i) {
	const important = document.querySelector("#important" + i);
	const grayButton = document.querySelector("#importantGray" + i);
	const colorButton = document.querySelector("#importantColor" + i);

	if (important.value === "true") {
		important.checked = true;
		changeBtn(grayButton, colorButton);
	} else {
		important.checked = false;
		changeBtn(colorButton, grayButton);
	}
}

function resetData(i) {
	const title = document.querySelector("#titleInput" + i);
	const content = document.querySelector("#contentInput" + i);
	const important = document.querySelector("#important" + i);
	// const planId = document.querySelector("#idInput" + i);

	title.value = "";
	content.value = "";
	// planId.value = "";
	important.value = false;

	loadImportant(i);
}

/* change button */
function changeBtn(hiddenButton, shownButton) {
	hiddenButton.classList.add("hidden");
	shownButton.classList.remove("hidden");
}

function hideButtons(i) {
	const planButtons = document.querySelector("#planButtons" + i);
	const sentence = document.querySelector("#sentenceButton" + i);
	const rating = document.querySelector("#rating" + i);
	const addPlan = document.querySelector("#addButton" + i);
	const editPlan = document.querySelector("#editButton" + i);
	// const addComment = document.querySelector("#addCommentButton" + i);
	// const editComment = document.querySelector("#editCommentButton" + i);
	const addSentence = document.querySelector("#contentButton" + i);
	const editSentence = document.querySelector("#editSentenceButton" + i);
	// const deleteComment = document.querySelector("#deleteCommentButton" + i);

	planButtons.classList.add("hidden");
	sentence.classList.add("hidden");
	rating.classList.add("hidden");
	addPlan.classList.add("hidden");
	// editPlan.classList.add("hidden");
	// addComment.classList.add("hidden");
	// editComment.classList.add("hidden");
	addSentence.classList.add("hidden");
	editSentence.classList.add("hidden");
	// deleteComment.classList.add("hidden");
}

function showButtons(type, i) {
	const planButtons = document.querySelector("#planButtons" + i);
	// const sentences = document.querySelector("#sentenceButtons" + i);
	const sentence = document.querySelector("#sentenceButton" + i);
	const rating = document.querySelector("#rating" + i);
	const addPlan = document.querySelector("#addButton" + i);
	const editPlan = document.querySelector("#editButton" + i);
	// const addComment = document.querySelector("#addCommentButton" + i);
	// const editComment = document.querySelector("#editCommentButton" + i);
	const addSentence = document.querySelector("#contentButton" + i);
	const editSentence = document.querySelector("#editSentenceButton" + i);
	// const deleteComment = document.querySelector("#deleteCommentButton" + i);

	if (type === "addPlan") {
		addPlan.disabled = false;
		addPlan.classList.remove("hidden");
		planButtons.classList.remove("hidden");
		sentence.classList.remove("hidden");
	} else if (type === "editPlan") {
		addPlan.disabled = true;
		editPlan.classList.remove("hidden");
		planButtons.classList.remove("hidden");
	} else if (type === "addSentence") {
		addPlan.disabled = true;
		// sentences.classList.remove("hidden");
		sentence.classList.remove("hidden");
		addSentence.classList.remove("hidden");
	} else if (type === "editSentence") {
		addPlan.disabled = true;
		// sentences.classList.remove("hidden");
		sentence.classList.remove("hidden");
		editSentence.classList.remove("hidden");
	} else if (type === "addFeedback") {
		addPlan.disabled = true;
		// addComment.classList.remove("hidden");
		rating.classList.remove("hidden");
	} else if (type === "editFeedback") {
		addPlan.disabled = true;
		// editComment.classList.remove("hidden");
		// deleteComment.classList.remove("hidden");
		rating.classList.remove("hidden");
	}
}

/* click button */
function clickSentence(i) {
	const grayButton = document.querySelector("#sentenceGray" + i);
	const colorButton = document.querySelector("#sentenceColor" + i);
	const dailyGrayButton = document.querySelector("#dailyGray" + i);
	const dailyColorButton = document.querySelector("#dailyColor" + i);
	const goalGrayButton = document.querySelector("#goalGray" + i);
	const goalColorButton = document.querySelector("#goalColor" + i);
	const titleBox = document.querySelector("#titleBox" + i);
	const title = document.querySelector("#titleInput" + i);
	const contentInput = document.querySelector("#contentInput" + i);

	hideButtons(i);
	if (colorButton.classList.contains("hidden")) {
		changeBtn(grayButton, colorButton);
		// changeBtn(dailyGrayButton, dailyColorButton);
		// changeBtn(goalColorButton, goalGrayButton);
		// resetData(i);
		// changeListHeight("sentence", i);
		title.required = false;
		titleBox.classList.add("hidden");
		showButtons("addSentence", i);
		contentInput.placeholder = "명언이나 목표를 작성해주세요.";

		// if (sentence === undefined) {
		// } else {
		// 	loadSentence(i, sentence);
		// 	showButtons("editSentence", i);
		// }
	} else {
		changeBtn(colorButton, grayButton);
		resetData(i);
		showButtons("addPlan", i);
		// changeListHeight("title", i);
		title.required = true;
		titleBox.classList.remove("hidden");
		contentInput.placeholder = "상세 내용을 입력해주세요.";
	}
}

function clickSlide(index) {
	const titleBox = document.querySelector("#titleBox" + index);
	const detailBox = document.querySelector("#detailBox" + index);
	const upImage = document.querySelector("#upImage" + index);
	const downImage = document.querySelector("#downImage" + index);
	const todolist = document.querySelector("#todolist" + index);

	titleBox.classList.toggle("active");
	detailBox.classList.toggle("active");
	upImage.classList.toggle("hidden");
	downImage.classList.toggle("hidden");
	todolist.classList.toggle("content");
}

function paintToDo(title, content, important) {
	const li = document.createElement("li");
	const checkBtn = document.createElement("input");
	const buttons = document.createElement("div");
	const editBtn = document.createElement("input");
	const delBtn = document.createElement("input");
	const span = document.createElement("span");
	const newId = toDos[toDos.length - 1] ? toDos[toDos.length - 1].id + 1 : 0;

	li.classList.add("plan");
	buttons.classList.add("buttons-default");
	checkBtn.classList.add("plan-check__button");
	editBtn.classList.add("edit__button");
	delBtn.classList.add("remove__button");
	span.classList.add("plan-title__span");
	if (important.value == true) {
		checkBtn.src =
			"data:image/png;base64,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";
	} else {
		checkBtn.src =
			"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PHBhdGggZD0iTTg1LjE0LDg2Ljg2di0xLjcyaDEuNzJ2MS43MnoiIGZpbGw9IiNjY2NjY2MiPjwvcGF0aD48ZyBmaWxsPSIjZDhkOGQ4Ij48cGF0aCBkPSJNMTUwLjIxMzMzLDE2OC41NmgtMTI4LjQyNjY3Yy0xMC4wOTA2NywwIC0xOC4zNDY2NywtOC4yNTYgLTE4LjM0NjY3LC0xOC4zNDY2N3YtMTI4LjQyNjY3YzAsLTEwLjA5MDY3IDguMjU2LC0xOC4zNDY2NyAxOC4zNDY2NywtMTguMzQ2NjdoMTI4LjQyNjY3YzEwLjA5MDY3LDAgMTguMzQ2NjcsOC4yNTYgMTguMzQ2NjcsMTguMzQ2Njd2MTI4LjQyNjY3YzAsMTAuMDkwNjcgLTguMjU2LDE4LjM0NjY3IC0xOC4zNDY2NywxOC4zNDY2N3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==";
	}
	checkBtn.type = "image";
	span.innerText = title;
	editBtn.src =
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAD5klEQVRoge2aP4gcZRjGn+eb2VvBJMtVaSyilanUQpSzUIx6nHjEU66wEGGZG24Pt9JKsLMSrJZjllk4DguFLLh3GtAUCjbiKiHRRlNotAhCRMxFVO72Zl6LyyyTyTf/Zzdb+Ov23W/f/T3zfd/8WZaYMu12+8T+/v4mgBdI/uj7fqvX610u2o8VuqVi23aD5Gci8niovAdg0XXdYZGeUwsQIx9QOMRUAqTIBxQKMfEAGeUDcoeYaICc8gG5QkwsQEH5gMwhJhKgpHxAphCVB6hIPiA1RKUBKpYPSAxRWYAJyQfEhqgkwITlA7QhSgeYknzAHSFKBZiyfMBtIQoHuEvyAeMQhQLYtt0AcAHAY5Vq5eMGyadyB5gReQAAya+NPB+YJflb3KuyjpxBeYjIJ5mW0CzKAxjW6/XnMs0ASRczJg9gsdPp3EydgfX19VO+71+dglQmSF5USj3rOM6fAJA6A77vvzx5rWxE5YEMAUie1ZR/r9QsG0MROROWB1ICWJZ1UkQWIuW/a7XaaRHZrVwxniGOrrx70TcSAyillgFErxUXNjc3//A871UAv1bnGEusPJASQERWNLUdANja2vpLRN6tRDGeRHkgIUCz2TxO8ulIeWSa5vnxi9HoAwAHpTU1kLxoGMZSkjyQEKBWqz0P4J5I+cvwJtre3r4hIt+WU9Wi3bA6YgPELJ+B7styyqWRumzCaAO02+06gKVIWQzDuOPMY5qmC+BmXssYcskDMQEODg7OADgRKX/T7XavRcc6jnNFKfUQybcBfArg3xzCYXLLA4CpK+qWD4CduCbdbvcXAO8AwMbGxrHRaPQKybcAnMroUUge0DxSrq6uGvPz89cAnAzXDcN40HGcK1kbN5vN46Zpvg/gxZShheUBzRJqNBoLiMgD+CGPPHB0najVahaA6wnDSskDmiWklNItn4+yNmy1WvOe5z0DYHk0Gq0AOKYbd+vGbMlxnMLygH4P6Ka8kdTEsqz7lFJnAax4nvdkTN8wQxFZLCsPRPbA2trawyQvxYx9z3XdN4MXrVbrgcPDw2UAqyQXor1iv1BzS1yG244UyaQN94Zt23UcnfNXPM87Teb7UYPkORGxqzjyAdGpfill/Os5+/skL4nIecMwPsx7IsjC+BBalnW/UurnCnoeisgQQJ/kOdd1f6ugZyzjGSBZ5tHxH5JfAOiLyG6v16tsiaQRDqB7dEziOoCPSQ7m5uY+73Q6+9WqZSO8Bx7JMP4qgB3f9wd7e3tf9ft9b0JemRkHEJHLJJ/QjPme5I7v+4My/2mYFOEl9BpJV0QeBfCdiOySHLiu+9Nd9Pufmec/tW7GxmdxZhgAAAAASUVORK5CYII=";
	editBtn.type = "image";
	delBtn.src =
		"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PHBhdGggZD0iTTg1LjE0LDg2Ljg2di0xLjcyaDEuNzJ2MS43MnoiIGZpbGw9IiNjY2NjY2MiPjwvcGF0aD48ZyBmaWxsPSIjYmMxMjAwIj48cGF0aCBkPSJNNjkuMTQ0LDEuNzJsLTguNDI4LDguNDI4aC0zMy43MTJjLTUuMDU2OCwwIC04LjQyOCwzLjM3MTIgLTguNDI4LDguNDI4YzAsNS4wNTY4IDMuMzcxMiw4LjQyOCA4LjQyOCw4LjQyOGgxNi44NTZoODQuMjhoMTYuODU2YzUuMDU2OCwwIDguNDI4LC0zLjM3MTIgOC40MjgsLTguNDI4YzAsLTUuMDU2OCAtMy4zNzEyLC04LjQyOCAtOC40MjgsLTguNDI4aC0zMy43MTJsLTguNDI4LC04LjQyOHpNMjcuMDA0LDQzLjg2djEwOS41NjRjMCw5LjI3MDggNy41ODUyLDE2Ljg1NiAxNi44NTYsMTYuODU2aDg0LjI4YzkuMjcwOCwwIDE2Ljg1NiwtNy41ODUyIDE2Ljg1NiwtMTYuODU2di0xMDkuNTY0ek02MC43MTYsNjAuNzE2YzUuMDU2OCwwIDguNDI4LDMuMzcxMiA4LjQyOCw4LjQyOHY3NS44NTJjMCw1LjA1NjggLTMuMzcxMiw4LjQyOCAtOC40MjgsOC40MjhjLTUuMDU2OCwwIC04LjQyOCwtMy4zNzEyIC04LjQyOCwtOC40Mjh2LTc1Ljg1MmMwLC01LjA1NjggMy4zNzEyLC04LjQyOCA4LjQyOCwtOC40Mjh6TTExMS4yODQsNjAuNzE2YzUuMDU2OCwwIDguNDI4LDMuMzcxMiA4LjQyOCw4LjQyOHY3NS44NTJjMCw1LjA1NjggLTMuMzcxMiw4LjQyOCAtOC40MjgsOC40MjhjLTUuMDU2OCwwIC04LjQyOCwtMy4zNzEyIC04LjQyOCwtOC40Mjh2LTc1Ljg1MmMwLC01LjA1NjggMy4zNzEyLC04LjQyOCA4LjQyOCwtOC40Mjh6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=";
	delBtn.type = "image";
	delBtn.addEventListener("click", (event) => {
		deleteToDo(1, event);
	});

	toDoList1.appendChild(li);
	li.appendChild(checkBtn);
	li.appendChild(span);
	li.appendChild(buttons);
	buttons.appendChild(editBtn);
	buttons.appendChild(delBtn);
	li.id = newId;
	const toDoObj = {
		id: newId,
		title: title,
		content: content,
		important: important,
		complete: false,
		feedback: {},
	};
	toDos.push(toDoObj);
	saveToDos();
}

function deleteToDo(_i, event) {
	const btn = event.target;
	const li = btn.parentNode.parentNode;
	toDoList1.removeChild(li);
	const cleanToDos = toDos.filter(function (toDo) {
		return toDo.id !== parseInt(li.id);
	});
	toDos = cleanToDos;
	saveToDos();
}

const addForm1 = document.querySelector("#addForm" + 1);
const addButton1 = document.querySelector("#addButton" + 1);
const toDoInput = addForm1.querySelector("input");
const toDoTextarea = addForm1.querySelector("textarea");
const toDoList1 = document.querySelector("#todolist" + 1);
const TODOS_LS = "toDos";

let toDos = [];

/* submit */
function handleSubmit(i, event) {
	// const addForm = document.querySelector("#addForm" + index);
	event.preventDefault();
	const currentPlanTitleValue = document.querySelector("#titleInput" + i).value;
	const currentPlanContentValue = document.querySelector("#contentInput" + i)
		.value;
	const currentImportantValue = document.querySelector("#important" + i).value;
	paintToDo(
		currentPlanTitleValue,
		currentPlanContentValue,
		currentImportantValue
	);
	resetData(i);
}

function saveToDos() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function init() {
	addButton1.addEventListener("click", (event) => {
		handleSubmit(1, event);
	});
}

init();
