/**
 * proxy fetch requests for the client
 */
export async function GET() {
	console.log('loading rss');
	const rss = await fetch('https://www.infosecurity-magazine.com/rss/news/');

	console.log('sending rss to client ');
	return rss;
}
