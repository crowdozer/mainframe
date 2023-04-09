import type { Feed, FeedItem } from './types';
import { getCoinTelegraphRSS, getHackerNewsStories, getInfosecRSS, getKrebsRSS } from './hydrators';
import { sortFeedHelper, stringToColor } from './utils';

export async function generateFeed(fetcher: typeof fetch): Promise<Feed> {
	try {
		const start = performance.now();

		const hnstories = await getHackerNewsStories(fetcher);
		const infosec = await getInfosecRSS(fetcher);
		const krebs = await getKrebsRSS(fetcher);
		const cointele = await getCoinTelegraphRSS(fetcher);

		const infoseccolor = stringToColor('infosec-mag');
		const krebscolor = stringToColor('krebs-sec');
		const cointelecolor = stringToColor('coin-telegraph');

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
						data: story,
						color: infoseccolor
					} as FeedItem)
			),
			...krebs.map(
				(story) =>
					({
						kind: 'krebs-sec',
						data: story,
						color: krebscolor
					} as FeedItem)
			),
			...cointele.map(
				(story) =>
					({
						kind: 'coin-tele',
						data: story,
						color: cointelecolor
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
