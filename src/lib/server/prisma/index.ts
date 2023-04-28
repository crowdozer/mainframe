import { dev } from '$app/environment';
import { PrismaClient } from '@prisma/client';

/**
 * This object is an alias for globalThis with an additional prisma property.
 * The globalThis object represents the global scope in JavaScript,
 * and this code ensures that there's a single PrismaClient instance
 * for the entire application.
 *
 * see more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
 */
const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};
/**
 * Export the prisma instance, effectively as a singleton.
 * Null coalesce to a new instance of prisma
 */
export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: dev ? ['query', 'error', 'warn'] : ['error'],
	});

/**
 * If we're not running in dev, assign that new client
 * instance to the globalThis property from above
 */
if (!dev) globalForPrisma.prisma = prisma;
