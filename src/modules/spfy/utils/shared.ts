/**
 * formats a given ms value into the mm:ss or hh:mm:ss format
 * this is used during initial server render & in subsequent client updates
 */
export function formatMilliseconds(milliseconds: number): string {
	const seconds = Math.floor(milliseconds / 1000)
	const hours = Math.floor(seconds / 3600)
	const remainingSeconds = seconds % 3600
	const minutes = Math.floor(remainingSeconds / 60)
	//   const remainingMilliseconds = milliseconds % 1000;

	const formattedHours = hours.toString().padStart(2, '0')
	const formattedMinutes = minutes.toString().padStart(2, '0')
	const formattedSeconds = (remainingSeconds % 60).toString().padStart(2, '0')

	if (hours > 0) {
		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
	} else {
		return `${formattedMinutes}:${formattedSeconds}`
	}
}

/**
 * returns lots of useful render data
 * this is used during initial server render & in subsequent client updates
 */
export function getProgressRenderData(progress: number, duration: number) {
	return {
		progressPercent: Math.round((progress / duration) * 100),
		progressText: formatMilliseconds(progress),
		durationText: formatMilliseconds(duration),
	}
}
