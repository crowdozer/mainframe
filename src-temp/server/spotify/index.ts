// import axios from 'axios';
// import qs from 'qs';

// const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

// const auth = `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
// 	'base64'
// )}`;

// async function getAccessToken() {
// 	try {
// 		const url = 'https://accounts.spotify.com/api/token';
// 		const payload = qs.stringify({ grant_type: 'client_credentials' });
// 		const opts = {
// 			headers: {
// 				'Content-Type': 'application/x-www-form-urlencoded',
// 				Authorization: auth
// 			}
// 		};

// 		const response = await axios.post(url, payload, opts);

// 		return response.data.access_token;
// 	} catch (error) {
// 		console.error('Error getting access token:', error);
// 		return null;
// 	}
// }

// export async function getCurrentTrack() {
// 	try {
// 		const accessToken = await getAccessToken();

// 		const url = `https://api.spotify.com/v1/me/player/currently-playing`;
// 		const opts = {
// 			headers: { Authorization: `Bearer ${accessToken}` }
// 		};

// 		const response = await axios.get(url, opts);

// 		return response.data;
// 	} catch (error) {
// 		console.error('Error getting current track:', error);
// 		return null;
// 	}
// }
