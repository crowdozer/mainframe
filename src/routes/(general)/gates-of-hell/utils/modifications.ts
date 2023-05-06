import { toasted } from '$web/utils/toast';
import { getRandomInt } from '$web/utils/random-int';
import type { DCG_Army, UnitByYear, UnitKind } from '../types';
import { fin } from '../unitsByYear';
import { set } from './manipulation';
import { intersects } from './arrays';

/**
 * Locks the units available to a faction up to the specified year.
 *
 * @param faction The target faction
 * @param year The target year
 * @param data The data to be updated
 * @returns The updated data with locked units
 */
export function lockUnitsToYear(faction: DCG_Army, year: number, data: any): any {
	const unlocks = getUnitsByYear(faction, year);

	// getUnitsByYear() is allowed to fail
	if (!unlocks) return;

	return set(data, 'saveinfo.unlockedResearch', [...unlocks]);
}

/**
 * Get all the units of a faction up to the specified year.
 *
 * @param faction The target faction
 * @param year The target year
 * @param kindBlacklist an array of unit kinds to disallow
 * @param doctrines an array of doctrine strings to whitelist
 * @returns An array of units available up to the target year
 */
export function getUnitsByYear(
	faction: DCG_Army,
	year: number,
	kindBlacklist: UnitKind[] = [],
	kindWhitelist: UnitKind[] = [],
	doctrinesBlacklist: string[] = [],
	doctrinesWhitelist: string[] = [],
): string[][] | null {
	return toasted('error collecting units', () => {
		const units = getUnitListByFaction(faction);

		return (
			units
				// filter out all units beyond the year limit
				.filter(
					makeFilterCallback(
						year,
						kindBlacklist,
						doctrinesBlacklist,
						kindWhitelist,
						doctrinesWhitelist,
					),
				)
				// return it in a savefile compatible format
				.map(({ unit }) => {
					return [`"${unit}"`];
				})
		);
	});
}

/**
 * Retrieves the unit list for a specified faction.
 *
 * @param faction The target faction
 * @returns The unit list for the specified faction
 * @throws An error if the faction is not supported
 */
export function getUnitListByFaction(faction: DCG_Army) {
	switch (faction) {
		case 'fin':
			return fin;
		default: {
			throw new Error('faction not supported yet');
		}
	}
}

/**
 * Filter callback for getUnitsByYear()
 */
function makeFilterCallback(
	year: number,
	kindBlacklist: UnitKind[],
	doctrinesBlacklist: string[],
	kindWhitelist: UnitKind[],
	doctrinesWhitelist: string[],
) {
	// Flags to quickly tell if the whitelist is specified
	const hasKindWhitelist = kindWhitelist.length > 0;
	const hasDoctrinesWhitelist = doctrinesWhitelist.length > 0;

	return ({ introduced, retired, probability, doctrines, kind }: UnitByYear) => {
		// rule out anything from the wrong year
		const isWithinYear = introduced <= year && retired >= year;
		if (!isWithinYear) {
			return false;
		}

		// If a kind blacklist exists, ensure the unit's kind is valid
		if (kindBlacklist.includes(kind)) {
			return false;
		}

		// If a doctrines blacklist exists, ensure the unit's doctrines do not intersect
		if (intersects(doctrinesBlacklist, doctrines)) {
			return false;
		}

		// If a kind whitelist exists, ensure the unit's kind is valid
		if (hasKindWhitelist) {
			if (!kindWhitelist.includes(kind)) {
				return false;
			}
		}

		// If a doctrine whitelist exists, ensure at least one doctrine checks out
		if (hasDoctrinesWhitelist) {
			if (!intersects(doctrinesWhitelist, doctrines)) {
				return false;
			}
		}

		// if a probability exists, return an answer based on that
		if (probability) {
			return getRandomInt(1, probability) === 1;
		}

		// otherwise, its ok
		return true;
	};
}
