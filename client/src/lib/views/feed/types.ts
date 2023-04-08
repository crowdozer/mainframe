export type HackerNewsStory = {
	score: number;
	title: string;
	type: 'story' | string;
	text?: string;
	url?: string;
	by: string;
	time: number;
};
export type InfoSecStory = {
	title: string;
	link: string;
	description: string;
	pubDate: number;
	guid: string;
};
export type FeedItem =
	| { kind: 'hacker-news'; data: HackerNewsStory }
	| { kind: 'infosec-mag'; data: InfoSecStory };
export type Feed = {
	feed: FeedItem[];
	time: number;
	date: Date;
};