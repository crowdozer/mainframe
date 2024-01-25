import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context: any) {
	const blogPosts = await getCollection('blog')

	return rss({
		title: 'crowdozers blog',
		description: 'the coolest corner on the internet 😎',
		site: context.site,
		items: blogPosts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			// date: post.data.date,
			description: post.data.description,
			link: `/blog/${post.slug}/`,
		})),
		customData: `<language>en-us</language>`,
	})
}
