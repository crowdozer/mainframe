import { CACHE_NAME, STALE_TIMER } from './const';
import type { Feed, FeedItem } from '$web/components/feed/types';
import { getCoinTelegraphRSS, getHackerNewsStories, getInfosecRSS, getKrebsRSS } from './hydrators';
import { sortFeedHelper, stringToColor } from './utils';
import { cache } from '../utils/cache';

type FeedWithoutISR = Omit<Feed, 'ISR'>;

/**
 * Generates the homepage feed. First it checks for a cached value,
 * and if one isn't found, it generates one.
 */
export async function generateFeed(fetcher: typeof fetch): Promise<FeedWithoutISR> {
	try {
		const cachedFeed = await getFeedFromCache();
		if (cachedFeed) {
			return cachedFeed;
		}

		// begin timing this
		const start = performance.now();

		// load all rss feeds
		const hnstories = await getHackerNewsStories(fetcher);
		const infosec = await getInfosecRSS(fetcher);
		const krebs = await getKrebsRSS(fetcher);
		const cointele = await getCoinTelegraphRSS(fetcher);

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

		// this is the final set of props exposed to the page
		const finalFeed = {
			feed: stories,
			elapsed: getElapsedTime(start),
			generated: new Date()
		};

		// push the final feed to the cache
		await setFeed(finalFeed);

		return finalFeed;
	} catch (error) {
		console.log('error aggregating feed');
		console.error(error);

		return {
			feed: [],
			elapsed: 0,
			generated: new Date()
		};
	}
}

/**
 * Checks the cache for a feed entry
 */
async function getFeedFromCache(): Promise<FeedWithoutISR | null> {
	try {
		const value = await cache.get(CACHE_NAME);

		if (!value) {
			// No error, the cache is just empty.
			return null;
		}

		const { feed, elapsed, generated } = JSON.parse(value as string);

		return {
			feed,
			elapsed,
			generated: new Date(generated as string)
		};
	} catch (error) {
		console.log('error fetching feed from cache');
		console.error(error);
		return null;
	}
}

/**
 * Sets a cache entry for the feed
 */
async function setFeed(feed: FeedWithoutISR): Promise<void> {
	try {
		await cache.set(CACHE_NAME, JSON.stringify(feed));
		await cache.expire(CACHE_NAME, STALE_TIMER);
	} catch (error) {
		console.log('error pushing feed to cache');
		console.error(error);
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
