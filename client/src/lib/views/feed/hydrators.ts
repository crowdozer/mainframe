import type { HackerNewsStory, InfoSecStory } from './types';
import parser from 'fast-xml-parser';

/**
 * Load all of the top stories from HackerNews
 */
export async function getHackerNewsStories(get: typeof fetch): Promise<HackerNewsStory[]> {
	const ids = await getHackerNewsStoryIDs(get);

	return Promise.all([
		...ids
			.slice(0, 20) // only get 20 stories
			.map((id) =>
				get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty').then((d) =>
					d.json()
				)
			)
	]);
}

/**
 * Load a list of top story IDs
 */
export async function getHackerNewsStoryIDs(get: typeof fetch): Promise<number[]> {
	const url = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';

	return get(url).then((data) => data.json());
}

/**
 * infosec RSS
 */
export async function getInfosecRSS(get: typeof fetch): Promise<InfoSecStory[]> {
	const xmlParser = new parser.XMLParser({
		attributeNamePrefix: '',
		ignoreAttributes: false,
		parseAttributeValue: true
	});

	return get('/api/feed', {})
		.then(async (response) => {
			console.log('[%s] %s', response.status, response.statusText);
			return response.text();
		})
		.then(async (xml) => {
			const result = xmlParser.parse(xml);

			return result.rss.channel.item
				.slice(0, 10) // only get 10 stories
				.map((item: any) => {
					return {
						description: item.description,
						guid: item.guid['#text'],
						link: item.link,
						pubDate: new Date(item.pubDate).getTime(),
						title: item.title
					} satisfies InfoSecStory;
				});
		});
}
