import type { Feed, FeedItem } from './types';
import { getHackerNewsStories, getInfosecRSS } from './hydrators';
import { sortFeedHelper } from './utils';

export async function generateFeed(fetcher: typeof fetch): Promise<Feed> {
	const start = performance.now();

	const hnstories = await getHackerNewsStories(fetcher);
	const infosec = await getInfosecRSS(fetcher);

	const stories: FeedItem[] = [
		...hnstories.map(
			(story) =>
				({
					kind: 'hacker-news',
					data: story
				} as FeedItem)
		),
		...infosec.map(
			(story) =>
				({
					kind: 'infosec-mag',
					data: story
				} as FeedItem)
		)
	].sort(sortFeedHelper);

	const end = performance.now();
	const elapsedSeconds = (end - start) / 1000;

	return {
		feed: stories,
		time: elapsedSeconds,
		date: new Date()
	};
}
