export async function get(key: string, fetcher = fetch): Promise<string | null> {
	const { value } = await fetcher('/api/cache?key=' + key)
		.then((data) => data.json())
		.catch((error) => {
			console.error(error);
			return { value: null };
		});

	return value;
}

export async function set(key: string, value: string, fetcher = fetch): Promise<void> {
	await fetcher('/api/cache?key=' + key, {
		method: 'post',
		body: JSON.stringify({
			key,
			value
		})
	});
}
