export type SpotifyAuthCode = {
	code: string;
	state: string;
};
export type SpotifyAccessToken = string | null;
export type SpotifyRefreshToken = string | null;

export type SpotifyCredentials = {
	access: SpotifyAccessToken | null;
	refresh: SpotifyRefreshToken | null;
	auth: SpotifyAuthCode | null;
};

export type AuthCodeTradeResponse = {
	success: boolean;
	reload: boolean;
};
