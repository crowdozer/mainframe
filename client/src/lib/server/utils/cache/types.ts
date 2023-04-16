export type Adapter = {
	get(key: string): Promise<string | null>;
	set(key: string, value: string): Promise<void>;
};

export type MakeAdapter = (prefix: string) => Adapter;
