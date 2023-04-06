/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const start = performance.now();
	const data = await getTopStories();
	const end = performance.now();
	const elapsedSeconds = (end - start) / 1000;

	return {
		top10: data,
		time: elapsedSeconds,
		date: Date.now()
	};
}

async function getTopStoryIDs(): Promise<number[]> {
	const url = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';

	return fetch(url).then((data) => data.json());
}

async function getTopStories(): Promise<Story[]> {
	const ids = await getTopStoryIDs();

	return Promise.all([
		...ids
			.slice(0, 25)
			.map((id) =>
				fetch('https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty').then((d) =>
					d.json()
				)
			)
	]);
}

export type Story = {
	score: number;
	title: string;
	type: 'story' | string;
	text?: string;
	url?: string;
};

export type Data = {
	top10: Story[];
	time: number;
	date: number;
};
