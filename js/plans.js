function slidePlanDetail(index) {
	const content = document.querySelector("#detailBox" + index);
	const downButton = document.querySelector("#moreDown" + index);
	const upButton = document.querySelector("#moreUp" + index);

	content.classList.toggle("hidden");
	downButton.classList.toggle("hidden");
	upButton.classList.toggle("hidden");
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
