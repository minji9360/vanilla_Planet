const YEAR = [];
const MONTH = [];
const DATE = [];
const DAY = [];

function getDay() {
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth();
	const date = today.getDate();
	const day = today.getDay();

	for (let i = -1; i < 2; i++) {
		const resultDay = new Date(year, month, date + i);

		YEAR.push(resultDay.getFullYear());
		MONTH.push(Number(resultDay.getMonth()) + 1);
		DATE.push(resultDay.getDate());

		if (day + i >= 0 && day + i <= 2) {
			DAY.push(day + i);
		} else if (day + i >= 3) {
			DAY.push(day + i - 3);
		} else {
			DAY.push(3 + i);
		}
	}
}

getDay();

const threeDays = {
	year: YEAR,
	month: MONTH,
	date: DATE,
	day: DAY,
};

export default threeDays;
