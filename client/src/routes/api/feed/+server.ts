/**
 * proxy fetch requests for the client
 */
export function GET() {
	// we can now simply pass on the original 3rd-party api response promise
	return fetch('https://www.infosecurity-magazine.com/rss/news/');
}
