export function formatDate(date: Date): string {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	const day = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear();

	// Add "st", "nd", "rd", or "th" to the day based on its last digit
	let daySuffix = 'th';
	if (day === 1 || day === 21 || day === 31) {
		daySuffix = 'st';
	} else if (day === 2 || day === 22) {
		daySuffix = 'nd';
	} else if (day === 3 || day === 23) {
		daySuffix = 'rd';
	}

	return `${month} ${day}${daySuffix}, ${year}`;
}
