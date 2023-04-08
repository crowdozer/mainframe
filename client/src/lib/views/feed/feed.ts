import type { Feed, FeedItem } from './types';
import { getHackerNewsStories, getInfosecRSS, getThreatPostRSS } from './hydrators';
import { sortFeedHelper } from './utils';

export async function generateFeed(fetcher: typeof fetch): Promise<Feed> {
	try {
		const start = performance.now();

		const hnstories = await getHackerNewsStories(fetcher);
		const infosec = await getInfosecRSS(fetcher);
		const threatpost = await getThreatPostRSS(fetcher);

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
			),
			...threatpost.map(
				(story) =>
					({
						kind: 'threat-post',
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
	} catch (error) {
		console.log('error aggregating feed');
		console.error(error);

		return {
			feed: [],
			time: 0,
			date: new Date()
		};
	}
}
