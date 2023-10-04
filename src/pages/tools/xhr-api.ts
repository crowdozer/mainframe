import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
	return new Response(
		JSON.stringify({
			message: 'hello from the api',
			time: new Date(),
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		},
	)
}
