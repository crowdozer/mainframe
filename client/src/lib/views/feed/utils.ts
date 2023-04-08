import type { FeedItem } from './types';

export function sortFeedHelper(a: FeedItem, b: FeedItem): number {
	const aDate = getFeedItemDate(a);
	const bDate = getFeedItemDate(b);

	return aDate < bDate ? 1 : -1;
}

export function getFeedItemDate(item: FeedItem): number {
	switch (item.kind) {
		case 'hacker-news':
			return item.data.time;
		case 'threat-post':
		case 'infosec-mag':
			return item.data.pubDate;
	}
}
