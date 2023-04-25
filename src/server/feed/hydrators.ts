import type {
	HackerNewsStory,
	InfoSecStory,
	KrebsStory,
	CoinTeleStory
} from '$web/components/feed/types';
import parser from 'fast-xml-parser';

/**
 * Generic fetch options to apply for rss hydrators
 */
const opts = {
	headers: {
		'Accept-Encoding': 'identity'
	}
};

/**
 * Load top n stories from HackerNews
 */
export async function getHackerNewsStories(get: typeof fetch, n = 20): Promise<HackerNewsStory[]> {
	try {
		// get the top 20 ids
		const ids = await getHackerNewsStoryIDs(get);
		const selection = ids.slice(0, n);

		// load all of those stories
		const storyPromises: Promise<HackerNewsStory>[] = selection.map((id) => {
			return get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty').then(
				(data) => data.json() as Promise<HackerNewsStory>
			);
		});
		const stories = await Promise.all(storyPromises);

		for (let i = 0; i < stories.length; i++) {
			// the time needs to be corrected for date constructors
			stories[i].time *= 10 * 10 * 10;
		}

		return stories;
	} catch (error) {
		console.log('error loading hackernews stories');
		console.error(error);

		return [];
	}
}

/**
 * Load a list of top story IDs
 */
export async function getHackerNewsStoryIDs(get: typeof fetch): Promise<number[]> {
	try {
		const url = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
		const ids = await get(url).then((data) => data.json());

		return ids;
	} catch (error) {
		console.log('error loading hackernews ids');
		console.error(error);

		return [];
	}
}

/**
 * Returns latest n posts from krebs
 */
export async function getKrebsRSS(get: typeof fetch, n = 10): Promise<KrebsStory[]> {
	try {
		const xml = await get('https://krebsonsecurity.com/feed/', opts).then((response) =>
			response.text()
		);
		const xmlParser = new parser.XMLParser({
			attributeNamePrefix: '',
			ignoreAttributes: false,
			parseAttributeValue: true
		});
		const result = xmlParser.parse(xml);

		return result.rss.channel.item
			.slice(0, n) // only get 10 stories
			.map((item: any) => {
				return {
					description: item.description,
					guid: item.guid['#text'],
					link: item.link,
					pubDate: new Date(item.pubDate).getTime(),
					title: item.title
				} satisfies KrebsStory;
			});
	} catch (error) {
		console.log('error loading threatpost rss');
		console.error(error);

		return [];
	}
}

/**
 * get the top n posts from the infosec RSS
 */
export async function getInfosecRSS(get: typeof fetch, n = 10): Promise<InfoSecStory[]> {
	try {
		const xml = await get('https://www.infosecurity-magazine.com/rss/news/', opts).then(
			(response) => response.text()
		);
		const xmlParser = new parser.XMLParser({
			attributeNamePrefix: '',
			ignoreAttributes: false,
			parseAttributeValue: true
		});
		const result = xmlParser.parse(xml);

		return result.rss.channel.item
			.slice(0, n) // only get 10 stories
			.map((item: any) => {
				return {
					description: item.description,
					guid: item.guid['#text'],
					link: item.link,
					pubDate: new Date(item.pubDate).getTime(),
					title: item.title
				} satisfies InfoSecStory;
			});
	} catch (error) {
		console.log('error loading infosec rss');
		console.error(error);

		return [];
	}
}

export async function getCoinTelegraphRSS(get: typeof fetch, n = 10): Promise<any[]> {
	try {
		const xml = await get('https://cointelegraph.com/rss/category/weekly-overview/', opts).then(
			(response) => response.text()
		);
		const xmlParser = new parser.XMLParser({
			attributeNamePrefix: '',
			ignoreAttributes: false,
			parseAttributeValue: true
		});
		const result = xmlParser.parse(xml);

		return result.rss.channel.item
			.slice(0, n) // only get 10 stories
			.map((item: any) => {
				return {
					description: item.description,
					guid: item.guid['#text'],
					link: item.link,
					pubDate: new Date(item.pubDate).getTime(),
					title: item.title
				} satisfies CoinTeleStory;
			});
	} catch (error) {
		console.log('error loading cointele rss');
		console.error(error);

		return [];
	}
}
