/**
 * proxy fetch requests for the client
 */
export async function GET() {
	const rss = await fetch('https://www.infosecurity-magazine.com/rss/news/', {
		headers: {
			'Accept-Encoding': 'identity'
		}
	});

	return rss;
}
