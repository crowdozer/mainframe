export type SpotifyAuthCode = {
	code: string;
	state: string;
};
export type SpotifyAccessToken = any;
export type SpotifyRefreshToken = any;

export type SpotifyCredentials = {
	access: SpotifyAccessToken | null;
	refresh: SpotifyRefreshToken | null;
	auth: SpotifyAuthCode | null;
};

export type AuthCodeTradeResponse = {
	success: boolean;
	reload: boolean;
};
