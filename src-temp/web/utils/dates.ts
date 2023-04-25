import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

/**
 * Returns a date in a fancy "from now" format
 */
export function fromNow(date: Date): string {
	return dayjs(date).fromNow();
}
