/**
 * proxy fetch requests for the client
 */
export async function GET() {
	const rss = await fetch('https://cointelegraph.com/rss/category/weekly-overview/', {
		headers: {
			'Accept-Encoding': 'identity'
		}
	});

	return rss;
}
