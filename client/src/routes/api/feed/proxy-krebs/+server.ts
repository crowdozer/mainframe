/**
 * proxy fetch requests for the client
 */
export async function GET() {
	const rss = await fetch('https://krebsonsecurity.com/feed/', {
		headers: {
			'Accept-Encoding': 'identity'
		}
	});

	return rss;
}
