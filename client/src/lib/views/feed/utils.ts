import type { FeedItem } from './types';

/**
 * Sorts the feed
 */
export function sortFeedHelper(a: FeedItem, b: FeedItem): number {
	const aDate = getFeedItemDate(a);
	const bDate = getFeedItemDate(b);

	return aDate < bDate ? 1 : -1;
}

/**
 * Extract posted date from a feed item
 */
export function getFeedItemDate(item: FeedItem): number {
	switch (item.kind) {
		case 'hacker-news':
			return item.data.time;
		default:
			return item.data.pubDate;
	}
}

/**
 * Converts the given input string into a hex code that
 * should be readable against black backgrounds
 */
export function stringToColor(inputString: string): string {
	let hash = 0;
	for (let i = 0; i < inputString.length; i++) {
		hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';
	for (let i = 0; i < 3; i++) {
		let value = (hash >> (i * 8)) & 0xff;
		value = value + 64; // Add 64 to ensure the color is lighter and readable against a black background
		color += ('00' + value.toString(16)).substr(-2);
	}

	return color;
}
