import type { Feed, FeedItem } from '$web/components/Feed/types';
import { getCoinTelegraphRSS, getHackerNewsStories, getInfosecRSS, getKrebsRSS } from './hydrators';
import { sortFeedHelper, stringToColor } from './utils';

type FeedWithoutISR = Omit<Feed, 'ISR'>;

/**
 * Generates the homepage feed. First it checks for a cached value,
 * and if one isn't found, it generates one.
 */
export async function generateFeed(fetcher: typeof fetch): Promise<FeedWithoutISR> {
	try {
		// begin timing this
		const start = performance.now();

		// load all rss feeds
		const feedPromises = [
			getHackerNewsStories(fetcher),
			getInfosecRSS(fetcher),
			getKrebsRSS(fetcher),
			getCoinTelegraphRSS(fetcher),
		];

		const [hnstories, infosec, krebs, cointele] = await Promise.all(feedPromises);

		// colorize their names deterministically
		const infoseccolor = stringToColor('infosec-mag');
		const krebscolor = stringToColor('krebs-sec');
		const cointelecolor = stringToColor('coin-telegraph');

		// merge them into one contiguous feed
		const stories: FeedItem[] = [
			...hnstories.map(
				(story) =>
					({
						kind: 'hacker-news',
						data: story,
					} as FeedItem),
			),
			...infosec.map(
				(story) =>
					({
						kind: 'infosec-mag',
						data: story,
						color: infoseccolor,
					} as FeedItem),
			),
			...krebs.map(
				(story) =>
					({
						kind: 'krebs-sec',
						data: story,
						color: krebscolor,
					} as FeedItem),
			),
			...cointele.map(
				(story) =>
					({
						kind: 'coin-tele',
						data: story,
						color: cointelecolor,
					} as FeedItem),
			),
		].sort(sortFeedHelper);

		// this is the final set of props exposed to the page
		const finalFeed = {
			feed: stories,
			elapsed: getElapsedTime(start),
			generated: new Date(),
		};

		return finalFeed;
	} catch (error) {
		console.log('error aggregating feed');
		console.error(error);

		return {
			feed: [],
			elapsed: 0,
			generated: new Date(),
		};
	}
}

/**
 * Returns the elapsed number of seconds
 */
function getElapsedTime(start: number): number {
	const end = performance.now();
	const elapsedSeconds = (end - start) / 1000;
	return elapsedSeconds;
}
