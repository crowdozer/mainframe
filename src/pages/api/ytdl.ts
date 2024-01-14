import type { APIRoute } from 'astro'
import ytdl from 'ytdl-core'

const ENABLED = true

export const prerender = false

/**
 * youtube video downloading api
 * expects url to be set in formdata
 */
export const POST: APIRoute = async ({ request }) => {
	if (!ENABLED) {
		return new Response(null, { status: 401 })
	}

	/**
	 * get and validate the url
	 */
	const data = await request.formData()
	const url = (data.get('url') || '') as string
	if (!url || !ytdl.validateURL(url)) {
		return new Response(JSON.stringify({ error: 'Invalid URL' }), {
			status: 400,
		})
	}

	/**
	 * now begin to stream the video to the client
	 */
	try {
		// Stream the video directly to the client
		const videoStream = ytdl(url)

		// it needs to be in this stream format, bc serverless
		// won't allow us to send a Readable directly
		const stream = new ReadableStream({
			start(controller) {
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
