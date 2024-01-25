export const isDev = process.env.NODE_ENV === 'development'
export const logDev = function (...args: any[]) {
	if (isDev) {
		console.log(...arguments)
	}
}
