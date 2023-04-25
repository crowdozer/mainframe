/**
 * Adapted from T3
 */
import { z } from 'zod';
import dotenv from 'dotenv';

/**
 * Specify your environment variables schema here.
 *
 * Environment variables that do not start with config.kit.env.publicPrefix
 * can be used in server-side code only, and are injected into the bundle
 * at build time. Ensure all referenced environment variables are declared.
 *
 * Example:
 * ```js
 * const Schema = z
 * 	.object({
 * 		EXAMPLE_VAR: z.string()
 * 	})
 * ```
 */
const Schema = z.object({
	SRV_REDIS_URL: z.string(),
	CLERK_UNPUBLISHABLE: z.string(),
	PUBLIC_CLERK_PUBLISHABLE: z.string(),
	CLERK_PEM: z.string(),
});

/**
 * Do not edit below this line
 */

dotenv.config();

const result = Schema.safeParse(process.env);

if (result.success === false) {
	console.error('❌ Invalid environment variables:', result.error.flatten().fieldErrors);
	throw new Error('Invalid environment variables');
}
