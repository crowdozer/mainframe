import type { HackerNewsStory, InfoSecStory } from './types';
import parser from 'fast-xml-parser';

/**
 * Load all of the top stories from HackerNews
 */
export async function getHackerNewsStories(get: typeof fetch): Promise<HackerNewsStory[]> {
	// get the top 20 ids
	const ids = await getHackerNewsStoryIDs(get);
	const selection = ids.slice(0, 20);

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
