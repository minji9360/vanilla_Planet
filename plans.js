const todolist = document.querySelector("#todolist");
const addForm = document.querySelector("#addForm");
const addSubmitButton = document.querySelector("#addButton");
const editSubmitButton = document.querySelector("#editButton");
const toDoInput = addForm.querySelector("input");
const toDoTextarea = addForm.querySelector("textarea");
const important = addForm.querySelector("#important");
const index = addForm.querySelector("#index");
const TODOS_LS = "toDos";

let loadedToDos = localStorage.getItem(TODOS_LS);
let parsedToDos = JSON.parse(loadedToDos);
let toDos = [];

if (parsedToDos != null) {
	parsedToDos.forEach(function (toDo) {
		toDos.push(toDo);
	});
}

function setToday() {
	const title = document.querySelector(".title__date");
	const titleDate = title.querySelector(".date");
	const titleDay = title.querySelector(".day");
	const today = new Date();
	const month = today.getMonth() + 1;
	const date = today.getDate();
	const day = today.getDay();
	const days = ["일", "월", "화", "수", "목", "금", "토"];

	titleDate.innerText = month + "월 " + date + "일";
	titleDay.innerText = days[day] + "요일";
}

/* slide */
function slidePlanDetail(event) {
	const btn = event.target;
	const li = btn.parentNode.parentNode.parentNode;
	const content = document.querySelector("#content" + li.id);
	const contentBtns = btn.parentNode;
	const downButton = contentBtns.querySelector(".down");
	const upButton = contentBtns.querySelector(".up");

	downButton.classList.toggle("hidden");
	upButton.classList.toggle("hidden");
	content.classList.toggle("hidden");
}

function clickSlide() {
	const titleBox = document.querySelector("#titleBox");
	const detailBox = document.querySelector("#detailBox");
	const upImage = document.querySelector("#upImage");
	const downImage = document.querySelector("#downImage");

	titleBox.classList.toggle("active");
	detailBox.classList.toggle("active");
	upImage.classList.toggle("hidden");
	downImage.classList.toggle("hidden");
	todolist.classList.toggle("content");
}

/* update data */
function updateImportant() {
	const grayButton = document.querySelector("#importantGray");
	const colorButton = document.querySelector("#importantColor");

	if (important.checked === true) {
		important.value = false;
		changeBtn(colorButton, grayButton);
	} else {
		important.value = true;
		changeBtn(grayButton, colorButton);
	}
}

function addPlan(title, content, important) {
	if (title != "") {
		const newId = toDos[toDos.length - 1] ? toDos[toDos.length - 1].id + 1 : 0;
		const toDoObj = {
			id: newId,
			title: title,
			content: content,
			important: important,
			complete: false,
		};
		toDos.push(toDoObj);
		saveToDos();
		paintPlan(
			toDoObj.id,
			toDoObj.title,
			toDoObj.content,
			toDoObj.important,
			toDoObj.complete
		);
	} else alert("할 일을 입력해주세요.");
}

function editPlan(event) {
	loadedToDos = localStorage.getItem(TODOS_LS);
	parsedToDos = JSON.parse(loadedToDos);

	const btn = event.target;
	const li = btn.parentNode.parentNode.parentNode;
	let checkToDos = parsedToDos.find(function (toDo) {
		return toDo.id == parseInt(li.querySelector("#index").value);
	});
	let checkToDosIndex = parsedToDos.findIndex(function (toDo) {
		return toDo.id == parseInt(li.querySelector("#index").value);
	});

	checkToDos.title = toDoInput.value;
	checkToDos.content = toDoTextarea.value;
	checkToDos.important = important.value;
	toDos.splice(checkToDosIndex, 1, checkToDos);
	saveToDos();
	reloadList();
}

function checkPlan(event) {
	const btn = event.target;
	const li = btn.parentNode;
	let checkToDos = parsedToDos.find(function (toDo) {
		return toDo.id == parseInt(li.id);
	});
	let checkToDosIndex = parsedToDos.findIndex(function (toDo) {
		return toDo.id == parseInt(li.id);
	});

	/* change data about complete option and save changed data */
	if (checkToDos.complete == true) {
		checkToDos.complete = false;
	} else {
		checkToDos.complete = true;
	}
	toDos.splice(checkToDosIndex, 1, checkToDos);
	saveToDos();
	reloadList();
}

function deletePlan(event) {
	const btn = event.target;
	const li = btn.parentNode.parentNode.parentNode.parentNode;
	const cleanToDos = toDos.filter(function (toDo) {
		return toDo.id !== parseInt(li.id);
	});

	toDos = cleanToDos;
	if (index.value == li.id) {
		resetData();
		changeBtn(editSubmitButton, addSubmitButton);
	}
	saveToDos();
	reloadList();
}

function saveToDos() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function resetData() {
	toDoInput.value = "";
	toDoTextarea.value = "";
	index.value = "";
	important.value = false;
	loadImportant();
}

/* load data */
function loadImportant() {
	const grayButton = document.querySelector("#importantGray");
	const colorButton = document.querySelector("#importantColor");

	if (important.value === "true") {
		important.checked = true;
		changeBtn(grayButton, colorButton);
	} else {
		important.checked = false;
		changeBtn(colorButton, grayButton);
	}
}

function loadPlan(event) {
	const btn = event.target;
	const li = btn.parentNode.parentNode.parentNode.parentNode;
	const span = li.querySelector("span");

	toDoInput.value = span.innerText;
	index.value = li.id;
	if (span.classList.contains("important")) {
		important.value = true;
		loadImportant();
	}
	if (document.querySelector("#content" + li.id)) {
		toDoTextarea.value = document
			.querySelector("#content" + li.id)
			.innerHTML.replace('<span class="plan-detail__span">', "")
			.replace("</span>", "")
			.replaceAll("<br>", "\r\n");
	}
}

function loadToDos() {
	loadedToDos = localStorage.getItem(TODOS_LS);
	parsedToDos = JSON.parse(loadedToDos);
	if (loadedToDos !== null) {
		parsedToDos.forEach(function (toDo) {
			if (toDo != null) {
				paintPlan(
					toDo.id,
					toDo.title,
					toDo.content,
					toDo.important,
					toDo.complete
				);
			}
		});
	} else {
		console.log("Nothing to load!");
	}
}

function reloadList() {
	const erase = new Promise((resolve) => {
		setTimeout(function () {
			resolve(eraseAll(todolist));
		}, 300);
	});
	const load = new Promise((resolve) => {
		setTimeout(function () {
			resolve(loadToDos());
		}, 300);
	});
	const allPromise = Promise.all([erase, load]);

	allPromise.catch((reason) =>
		console.log("Check Plan Promise Error : " + reason)
	);
}

/* change button */
function changeBtn(hiddenButton, shownButton) {
	hiddenButton.classList.add("hidden");
	shownButton.classList.remove("hidden");
}

function hideButtons() {
	const planButtons = document.querySelector("#planButtons");
	const addSentence = document.querySelector("#contentButton");
	const editSentence = document.querySelector("#editSentenceButton");

	planButtons.classList.add("hidden");
	addSubmitButton.classList.add("hidden");
	addSentence.classList.add("hidden");
	editSentence.classList.add("hidden");
}

function showButtons(type) {
	const planButtons = document.querySelector("#planButtons");
	const addSubmitButton = document.querySelector("#addButton");
	const editPlan = document.querySelector("#editButton");
	const addSentence = document.querySelector("#contentButton");
	const editSentence = document.querySelector("#editSentenceButton");

	if (type === "addPlan") {
		addSubmitButton.disabled = false;
		addSubmitButton.classList.remove("hidden");
		planButtons.classList.remove("hidden");
	} else if (type === "editPlan") {
		addSubmitButton.disabled = true;
		editPlan.classList.remove("hidden");
		planButtons.classList.remove("hidden");
	} else if (type === "addSentence") {
		addSubmitButton.disabled = true;
		addSentence.classList.remove("hidden");
	} else if (type === "editSentence") {
		addSubmitButton.disabled = true;
		editSentence.classList.remove("hidden");
	} else if (type === "addFeedback") {
		addSubmitButton.disabled = true;
	} else if (type === "editFeedback") {
		addSubmitButton.disabled = true;
	}
}

/* click button */
function clickEdit(event) {
	const downBtn = document.querySelector("#downImage");
	const btn = event.target;
	const li = btn.parentNode.parentNode.parentNode.parentNode;

	if (downBtn.classList.contains("hidden")) {
		resetData();
		clickSlide();
		loadPlan(event);
		changeBtn(addSubmitButton, editSubmitButton);
	} else {
		if (index.value == li.id) {
			resetData();
			clickSlide();
			changeBtn(editSubmitButton, addSubmitButton);
		} else {
			resetData();
			loadPlan(event);
			changeBtn(addSubmitButton, editSubmitButton);
		}
	}
}

/* erase all of to do list */
function eraseAll(todolist) {
	while (todolist.firstChild) todolist.removeChild(todolist.firstChild);
}

/* print Plan */
function paintPlan(id, title, content, important, complete) {
	const li = document.createElement("li");
	const checkBtn = document.createElement("input");
	const buttons = document.createElement("div");
	const defaultBtns = document.createElement("div");
	const editBtn = document.createElement("a");
	const editImg = document.createElement("img");
	const delBtn = document.createElement("a");
	const delImg = document.createElement("img");
	const titleSpan = document.createElement("span");
	const contentBox = document.createElement("div");
	const contentBtn = document.createElement("a");
	const contentDownBtn = document.createElement("img");
	const contentUpBtn = document.createElement("img");
	const contentSpan = document.createElement("span");
	const detail = document.createElement("div");
	const detailSpan = document.createElement("span");

	li.classList.add("plan");
	checkBtn.classList.add("plan-check__button");
	buttons.classList.add("buttons");
	defaultBtns.classList.add("buttons-default");
	editBtn.classList.add("edit__button");
	delBtn.classList.add("remove__button");
	titleSpan.classList.add("plan-title__span");
	contentBox.classList.add("plan-detail");
	contentBtn.classList.add("more__button");
	contentSpan.classList.add("plan-detail__span");
	if (important == "true") {
		if (complete == false) {
			checkBtn.src =
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFN0lEQVRoge2ZW2xUVRSGv7VPhzZcKgpVrEhnpngFxU6rckvQGI2aqFHREKNvXqJReTK+GEASE5+0Rh40PvliSCPxEmPCg5IYRYLTAWlQIrZTSiUpaFNE7GV69vJhZjpnDmfoOTBjlfAnk8zee+21/v+stc/es0eoEQ4uY+7oqHnNWLR+jn1j2UH+qkWculo4BRgfNa+I8qoKjJ02Y2Bfr0UcUwunAGq52tNsqVWcmgn4t3BRwEzjrAK6wNnbWlbLUTyf9LRGzskHsH8xV+26o/LLpqKAb69jXmvSHHCsGUgnzIdd4EQJrMZuA0mDpK2126LMBVCQ7qTpdGNmsPGIOZJu4cogO6nkINPCKjVmt8dye2+fffJxcKOSiQoFySTMNuCFUnx5oL3P/cJvWzEDdiFphf0erxuSCfN+lbkGIpM0b+IlD311p91dQbYVMwCQWUqTuuZrYHmxbzxnF6weZNhrty9O3MU8KKJ3gcSBy4F6n7tx4Dhov6p85WA/b+un3x9TwWQSZoJCySpkDfbOVJYjkQV4ROwE2kB+6M26q4pllF5Kq7hmC/AE0d9oLvCRde2WWwfo8w50J2QnyD3AYcHeXYl8KAEA6XZiMsLNDQ30LDvIBEAm7mxQ0Q+AuRGJ+3EK5On2rNtV7OgCJ9nCilPCT3f2M3a2yaEE+JGOm40idFYYHsuToimKT4GXU1n7blQukTeydMJ5TIS3fN1jKG8L9pZU1s5OZe0VImyN4lehszvpPBKVT6QMpK9loeTMIWCBp7tHHftwx6/0em1/bCExaUwf0XBicsLecPtv/BF2QqQMSM5sppz8zzHXrvOTVzCumGei+C6gKTbLbIrEKaxhupnZUm+OAZcUulyjtqOtv7RXZFqc+6yxzwmyBlgYhYgHI+M527x6kNEwxqEzYOqd+ymRB/jYSz4dN5vU6JeCPMS5kweYX+8494bmFdZQ0baytsr24vfuOCtF2BzW17SxjKbC2oZfA6I3lk0Ud9/UkJj1kXxNF0p0+fRWeUwdUxWkZwnzi+1DA/xZdnBTswh0qmUv4xjZ4lxdcY5bSjDULPKG7gLn+iU0Fts3DTAiBTIGIJ1kbSZhhnKOGS5+WhNmOJN0Hi05Ve/GNNLRTa7UlEib1vQCSrEyCWd9a6LEK+eY4UzCDKWTrJ0SIGqe5cyds1GVl0ocy8Z/L7OU81q0Z8ITS+FFKD39ApoKnAsCRD4DrN+Pqn4CsCtOQ5kTlRPlhlUWAI2FmKD6acC4LXDOr4FUn7tjT4LmmGFx0cKF47f1chRgjkNTmTyxUxnYs5RG3DOOzueNOQ5NwNH2ftu5t5UdTv6IDkDOMriyj6EpAQArswxBvtMP72QARU4UF3RdxENbWJjJvACAwoM8GmgXyptbV0bSKFMlJJO1ESBSF8pvKAEiWpYBK55FbJxq139gzEoIJcCi5U9DxfsWqkkGEK1eBnyvUNSUSgjVmmQAG+7BhCshvzN1Sxmo9h5QgJUqCsBXj7OsJwO2NgKEKq4BMGVP41SDZxGHrNXoMFXMgK/OzWkmPa3mCKzCQ2u4iOtjZuuBJVyaSThP4fudUDWEXAOV70bjrFMx75C/lYt0sVtFuAo9BrsxleWbIINAAYXbuMOU/4ScSYxozF7T8YvvFEyFEpJJZzX/HfIA850JZ03QQKAAK8yrLZ/oqMTpwv6L6f+A4DWgbuDZe2bhBl6xBwo4Gec7kD21JRQF8n1vlt2BI5WmpJuZTb153igphFjtyJ0FSg5Dtx2z73Uc4+8Z4XARFzr+AcMkqToDTdalAAAAAElFTkSuQmCC";
			titleSpan.classList.remove("completed");
			editBtn.classList.remove("hidden");
		} else {
			checkBtn.src =
				"data:image/png;base64,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";
			titleSpan.classList.add("completed");
			editBtn.classList.add("hidden");
		}
		checkBtn.type = "image";
		titleSpan.classList.add("important");
	} else {
		if (complete == true) {
			checkBtn.src =
				"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIHRyYW5zZm9ybT0iIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxwYXRoIGQ9Ik04NS4xNCw4Ni44NnYtMS43MmgxLjcydjEuNzJ6IiBmaWxsPSIjY2NjY2NjIj48L3BhdGg+PHBhdGggZD0iIiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iIzNlYWM0OSI+PHBhdGggZD0iTTc2LjgyNjY3LDEyNi40OTEwOWwtNDMuMTc4ODgsLTQzLjE3ODg4bDEyLjk3MTA5LC0xMi45NzEwOWwzMC4yMDc3OSwzMC4yMDc3OWw4OC43NTIsLTg4Ljc1MmMtMy4yNzQ4OCwtNS4wMTc4MSAtOC45MjU2NSwtOC4zNTY5MSAtMTUuMzY1MzMsLTguMzU2OTFoLTEyOC40MjY2N2MtMTAuMTM2NTMsMCAtMTguMzQ2NjcsOC4yMTAxMyAtMTguMzQ2NjcsMTguMzQ2Njd2MTI4LjQyNjY3YzAsMTAuMTM2NTMgOC4yMTAxMywxOC4zNDY2NyAxOC4zNDY2NywxOC4zNDY2N2gxMjguNDI2NjdjMTAuMTM2NTMsMCAxOC4zNDY2NywtOC4yMTAxMyAxOC4zNDY2NywtMTguMzQ2Njd2LTExNS40NTU1N3oiPjwvcGF0aD48L2c+PC9nPjwvZz48L3N2Zz4=";
			titleSpan.classList.add("completed");
			editBtn.classList.add("hidden");
		} else {
			checkBtn.src =
				"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PHBhdGggZD0iTTg1LjE0LDg2Ljg2di0xLjcyaDEuNzJ2MS43MnoiIGZpbGw9IiNjY2NjY2MiPjwvcGF0aD48ZyBmaWxsPSIjZDhkOGQ4Ij48cGF0aCBkPSJNMTUwLjIxMzMzLDE2OC41NmgtMTI4LjQyNjY3Yy0xMC4wOTA2NywwIC0xOC4zNDY2NywtOC4yNTYgLTE4LjM0NjY3LC0xOC4zNDY2N3YtMTI4LjQyNjY3YzAsLTEwLjA5MDY3IDguMjU2LC0xOC4zNDY2NyAxOC4zNDY2NywtMTguMzQ2NjdoMTI4LjQyNjY3YzEwLjA5MDY3LDAgMTguMzQ2NjcsOC4yNTYgMTguMzQ2NjcsMTguMzQ2Njd2MTI4LjQyNjY3YzAsMTAuMDkwNjcgLTguMjU2LDE4LjM0NjY3IC0xOC4zNDY2NywxOC4zNDY2N3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==";
			titleSpan.classList.remove("completed");
			editBtn.classList.remove("hidden");
		}
		checkBtn.type = "image";
	}
	titleSpan.innerText = title;
	editImg.src =
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAD5klEQVRoge2aP4gcZRjGn+eb2VvBJMtVaSyilanUQpSzUIx6nHjEU66wEGGZG24Pt9JKsLMSrJZjllk4DguFLLh3GtAUCjbiKiHRRlNotAhCRMxFVO72Zl6LyyyTyTf/Zzdb+Ov23W/f/T3zfd/8WZaYMu12+8T+/v4mgBdI/uj7fqvX610u2o8VuqVi23aD5Gci8niovAdg0XXdYZGeUwsQIx9QOMRUAqTIBxQKMfEAGeUDcoeYaICc8gG5QkwsQEH5gMwhJhKgpHxAphCVB6hIPiA1RKUBKpYPSAxRWYAJyQfEhqgkwITlA7QhSgeYknzAHSFKBZiyfMBtIQoHuEvyAeMQhQLYtt0AcAHAY5Vq5eMGyadyB5gReQAAya+NPB+YJflb3KuyjpxBeYjIJ5mW0CzKAxjW6/XnMs0ASRczJg9gsdPp3EydgfX19VO+71+dglQmSF5USj3rOM6fAJA6A77vvzx5rWxE5YEMAUie1ZR/r9QsG0MROROWB1ICWJZ1UkQWIuW/a7XaaRHZrVwxniGOrrx70TcSAyillgFErxUXNjc3//A871UAv1bnGEusPJASQERWNLUdANja2vpLRN6tRDGeRHkgIUCz2TxO8ulIeWSa5vnxi9HoAwAHpTU1kLxoGMZSkjyQEKBWqz0P4J5I+cvwJtre3r4hIt+WU9Wi3bA6YgPELJ+B7styyqWRumzCaAO02+06gKVIWQzDuOPMY5qmC+BmXssYcskDMQEODg7OADgRKX/T7XavRcc6jnNFKfUQybcBfArg3xzCYXLLA4CpK+qWD4CduCbdbvcXAO8AwMbGxrHRaPQKybcAnMroUUge0DxSrq6uGvPz89cAnAzXDcN40HGcK1kbN5vN46Zpvg/gxZShheUBzRJqNBoLiMgD+CGPPHB0najVahaA6wnDSskDmiWklNItn4+yNmy1WvOe5z0DYHk0Gq0AOKYbd+vGbMlxnMLygH4P6Ka8kdTEsqz7lFJnAax4nvdkTN8wQxFZLCsPRPbA2trawyQvxYx9z3XdN4MXrVbrgcPDw2UAqyQXor1iv1BzS1yG244UyaQN94Zt23UcnfNXPM87Teb7UYPkORGxqzjyAdGpfill/Os5+/skL4nIecMwPsx7IsjC+BBalnW/UurnCnoeisgQQJ/kOdd1f6ugZyzjGSBZ5tHxH5JfAOiLyG6v16tsiaQRDqB7dEziOoCPSQ7m5uY+73Q6+9WqZSO8Bx7JMP4qgB3f9wd7e3tf9ft9b0JemRkHEJHLJJ/QjPme5I7v+4My/2mYFOEl9BpJV0QeBfCdiOySHLiu+9Nd9Pufmec/tW7GxmdxZhgAAAAASUVORK5CYII=";
	delImg.src =
		"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PHBhdGggZD0iTTg1LjE0LDg2Ljg2di0xLjcyaDEuNzJ2MS43MnoiIGZpbGw9IiNjY2NjY2MiPjwvcGF0aD48ZyBmaWxsPSIjYmMxMjAwIj48cGF0aCBkPSJNNjkuMTQ0LDEuNzJsLTguNDI4LDguNDI4aC0zMy43MTJjLTUuMDU2OCwwIC04LjQyOCwzLjM3MTIgLTguNDI4LDguNDI4YzAsNS4wNTY4IDMuMzcxMiw4LjQyOCA4LjQyOCw4LjQyOGgxNi44NTZoODQuMjhoMTYuODU2YzUuMDU2OCwwIDguNDI4LC0zLjM3MTIgOC40MjgsLTguNDI4YzAsLTUuMDU2OCAtMy4zNzEyLC04LjQyOCAtOC40MjgsLTguNDI4aC0zMy43MTJsLTguNDI4LC04LjQyOHpNMjcuMDA0LDQzLjg2djEwOS41NjRjMCw5LjI3MDggNy41ODUyLDE2Ljg1NiAxNi44NTYsMTYuODU2aDg0LjI4YzkuMjcwOCwwIDE2Ljg1NiwtNy41ODUyIDE2Ljg1NiwtMTYuODU2di0xMDkuNTY0ek02MC43MTYsNjAuNzE2YzUuMDU2OCwwIDguNDI4LDMuMzcxMiA4LjQyOCw4LjQyOHY3NS44NTJjMCw1LjA1NjggLTMuMzcxMiw4LjQyOCAtOC40MjgsOC40MjhjLTUuMDU2OCwwIC04LjQyOCwtMy4zNzEyIC04LjQyOCwtOC40Mjh2LTc1Ljg1MmMwLC01LjA1NjggMy4zNzEyLC04LjQyOCA4LjQyOCwtOC40Mjh6TTExMS4yODQsNjAuNzE2YzUuMDU2OCwwIDguNDI4LDMuMzcxMiA4LjQyOCw4LjQyOHY3NS44NTJjMCw1LjA1NjggLTMuMzcxMiw4LjQyOCAtOC40MjgsOC40MjhjLTUuMDU2OCwwIC04LjQyOCwtMy4zNzEyIC04LjQyOCwtOC40Mjh2LTc1Ljg1MmMwLC01LjA1NjggMy4zNzEyLC04LjQyOCA4LjQyOCwtOC40Mjh6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=";

	checkBtn.addEventListener("click", (event) => {
		checkPlan(event);
	});
	delBtn.addEventListener("click", (event) => {
		deletePlan(event);
	});
	editBtn.addEventListener("click", (event) => {
		clickEdit(event);
	});
	contentBtn.addEventListener("click", (event) => {
		slidePlanDetail(event);
	});

	todolist.appendChild(li);
	li.appendChild(checkBtn);
	li.appendChild(titleSpan);
	li.appendChild(buttons);
	buttons.appendChild(defaultBtns);
	defaultBtns.appendChild(editBtn);
	defaultBtns.appendChild(delBtn);
	editBtn.appendChild(editImg);
	delBtn.appendChild(delImg);
	if (content !== "") {
		contentDownBtn.src =
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACI0lEQVRoge2WvYsTQRxA30wgkSxcEbg7rtBiC5VgCv+CQ0FEsDiRIFyVwLJZAjb+I2ks8gVJY2M4vEIEo56cVcpUEUtREBGSSjRfuxZ3ykayyWSz0WYeLIGZ3+y+B9kQ0Gg0Go1Go9FoNBrN/0GoDhYKhVue55WAS8CL8Xj8sNFofItCIp/Pb8fj8cee590BPgohHlUqlVcqZ5UCisXixclk8h4wfMs913Vv1uv1ryGc/2BZ1q6U8gRI+5a/u657tV6vf152Xqo8ZDqd7jMrD5CWUp5YlrWrrjtLgDyAIYTYV7mHUoDrup8CtkJHLJA/E5My6JmzcypDtVrtFDgO2F45Ypk8cFypVN6p3EspAGAwGDwQQjwP2E5LKU9t297zL3Y6na1Op7PlX3McZ0dK+Zpg+bZhGIeqXsoBrVZr1O/37y+IuAK8/TvCj+M4O67rvgGuBYy0DcM4KJVKP1S9lH9Gf5PNZuOpVOrI87y7ASMfgBvVavWLf3ET8hAiAFaP2JQ8hAwA9Qgp5XRT8rBGAEAul7uQSCSOPc+7HTDSO/+c+8IKIV4Oh8ODZrP5M6xDLOxBgG63OzFN82kymbwOXJ4zsn1+zaNtGMa9crkcWh7WDADo9XpT0zSPFkTMY62vjZ+1A2DliMjkIaIAUI6IVB4iDIClEZHLQ8QBcBaRyWSexWIxE8gACCGejEajw3Vf2H+Obdt7i/5aaDQajUaj0WjW4xcM6eEguPqbRwAAAABJRU5ErkJggg==";
		contentUpBtn.src =
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACDElEQVRoge2Vv2vbQBTHv3cGycXQrS2BJku3UhsKHrSlSUMCIUO3QiZRbOFFg/8Sr8JSjZeWQgJt1kJKuhkCxkMxpP9AiLsZRCv/uOtQBMVIzkk+be8z3nv33vd7904CCIIgCIIgiEJwHGfLcZytInuwIoratl02DOM9gFMAYIx9iKKo0e/3/+jupd2A67rmbDY7l1KerIS+ViqVN51O57fOfloNrBEfo92ENgMK4mO0mtBiIIP4GG0mNjaQQ3yMFhOlTTbbtl1mjF1IKY9TUsYAfgF4lBB7tlgs6tVq9Xw0Gi3yauB5N7qua5qmeSalPEpJuQFwwDnfA/AjKUFKeWQYxkW73X6QV0euEVIYmxsAe91u9xYAWq3WYyHEJYAXKfm5xymzgaziY4oykclAVvGDweAhAFiWNQWKMaH8BvKe/P94njfhnL9GypsAcBiG4Zcsb0LZQBRFn9aIHwshdlfFW5Y1jU8/xvO8iRDiAP++UEkchmH4UVWX0gg1m81dxthVSngshNgPguBOtSkANBqNJ5zzbwCeJ8WllK983/9+Xx2lG+Ccb6eEcokHgCAI7oQQ+0i/iadK2lSSlsvlFYBwZTm3+Jg1JkIp5b2nDyj+iYfD4bRer18DeAmgDODzfD5/2+v1JpkUJ9cOa7XaWalU2gGwA+AnY+yd7/ujTWsTBEEQBEEQBEEQRfIXsHQhP8gho60AAAAASUVORK5CYII=";
		todolist.appendChild(contentBox);
		contentBox.appendChild(contentSpan);
		detail.appendChild(detailSpan);
		li.appendChild(detail);
		buttons.appendChild(contentBtn);
		contentBtn.appendChild(contentDownBtn);
		contentBtn.appendChild(contentUpBtn);

		contentBox.classList.add("hidden");
		contentDownBtn.classList.add("down");
		contentUpBtn.classList.add("up");
		contentUpBtn.classList.add("hidden");

		contentBox.id = "content" + id;
		contentSpan.innerText = content;
	}
	li.id = id;
}

/* submit */
function handleAddSubmit(event) {
	event.preventDefault();
	const currentPlanTitleValue = toDoInput.value;
	const currentPlanContentValue = toDoTextarea.value;
	const currentImportantValue = important.value;

	addPlan(
		currentPlanTitleValue,
		currentPlanContentValue,
		currentImportantValue
	);
	resetData();
}

function handleEditSubmit(event) {
	event.preventDefault();
	editPlan(event);
	resetData();
	changeBtn(editSubmitButton, addSubmitButton);
}

function init() {
	setToday();
	loadToDos();
	addSubmitButton.addEventListener("click", (event) => {
		handleAddSubmit(event);
	});
	editSubmitButton.addEventListener("click", (event) => {
		handleEditSubmit(event);
	});
}

init();
