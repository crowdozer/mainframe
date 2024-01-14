import type { APIRoute } from 'astro'
import ytdl from 'ytdl-core'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
	const data = await request.formData()
	const url = (data.get('url') || '') as string
	if (!url || !ytdl.validateURL(url)) {
		return new Response(JSON.stringify({ error: 'Invalid URL' }), {
			status: 400,
		})
	}

	try {
		// it needs to be in this stream format
		const stream = new ReadableStream({
			start(controller) {
				// Stream the video directly to the client
				const videoStream = ytdl(url)
				videoStream.on('data', (chunk) => {
					controller.enqueue(chunk)
				})
				videoStream.on('end', () => {
					controller.close()
				})
				videoStream.on('error', (error) => {
					controller.error(error)
				})
			},
			cancel() {
				console.log('cancelled')
			},
		})

		return new Response(stream, {
			headers: {
				'Content-Type': 'video/mp4',
				'Content-Disposition': 'attachment; filename="download.mp4"',
			},
		})
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Error downloading video' }), {
			status: 500,
		})
	}
}
