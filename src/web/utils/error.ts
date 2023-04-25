/**
 * handles an error via window.alert
 * @param error the error thrown
 * @param message string to prepend to the error reason
 */
export function handleAlert(error: any, message = 'something went wrong: '): void {
	window.alert(message + error.message || 'unknown');
	console.error(error);
}
