import { prisma } from './';
import type { Prisma } from '@prisma/client';

export async function updateOrCreateUser(
	userID: string,
	data: Prisma.UserUpdateArgs['data'],
): Promise<void> {
	void (await prisma.user.upsert({
		where: {
			id: userID,
		},
		create: {
			id: userID,
		},
		update: data,
	}));
}
