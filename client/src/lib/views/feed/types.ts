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

export type KrebsStory = {
	title: string;
	link: string;
	description: string;
	pubDate: number;
	guid: string;
};

export type CoinTeleStory = {
	title: string;
	link: string;
	description: string;
	pubDate: number;
	guid: string;
};

export type FeedItem =
	| { kind: 'hacker-news'; data: HackerNewsStory }
	| { kind: 'infosec-mag'; color: string; data: InfoSecStory }
	| { kind: 'krebs-sec'; color: string; data: KrebsStory }
	| { kind: 'coin-tele'; color: string; data: CoinTeleStory };

export type Feed = {
	feed: FeedItem[];
	time: number;
	date: Date;
};
