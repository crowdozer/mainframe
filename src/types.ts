import type { JwtPayload } from 'jsonwebtoken';

export type AuthState = {
	isLoggedIn: boolean;
	id?: string;
	jwt?: JwtPayload;
};
