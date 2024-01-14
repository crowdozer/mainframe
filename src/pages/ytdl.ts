import type { APIRoute } from 'astro'
import fs from 'fs'
import ytdl from 'ytdl-core'
import crypto from 'crypto'

const sleep = (ms: number) => {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve()
		}, ms)
	})
}

export const GET: APIRoute = async () => {
	const url = 'https://www.youtube.com/watch?v=a5ITNmnS680'
	const id = crypto.randomUUID()
	const filename = `${id}.mp4`
	const target = `./public/downloads/${filename}`

	let isRunning = true

	console.log('downloading %s', url)
	ytdl(url)
		.pipe(fs.createWriteStream(target))
		.on('finish', () => {
			console.log('Download completed!')
			isRunning = false
		})

	while (isRunning) {
		console.log('still downloading...')
		await sleep(5000)
	}

	console.log('download complete!')

	return new Response(
		JSON.stringify({
			message: 'your file is ready',
			time: new Date(),
		}),
		{
			status: 200,
			headers: {
				'Content-Disposition': `attachment; filename="${target}"`,
			},
		},
	)
}
