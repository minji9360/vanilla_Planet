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

function resetData(i) {
	const title = document.querySelector("#titleInput" + i);
	const content = document.querySelector("#contentInput" + i);
	const important = document.querySelector("#important" + i);
	const daily = document.querySelector("#senteceDaily" + i);
	const planId = document.querySelector("#idInput" + i);

	title.value = "";
	content.value = "";
	planId.value = "";
	important.value = false;
	daily.checked = true;

	clickTime("all", i);
	loadImportant(i);
}

/* change button */
function changeBtn(hiddenButton, shownButton) {
	hiddenButton.classList.add("hidden");
	shownButton.classList.remove("hidden");
}

function hideButtons(i) {
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

	planButtons.classList.add("hidden");
	// sentences.classList.add("hidden");
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
		// resetData(i);
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

function init() {}

init();
