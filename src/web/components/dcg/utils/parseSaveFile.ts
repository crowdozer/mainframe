import JSZip from 'jszip';
import { deserializeData } from './serialization';
import { handleAlert } from '$web/utils/error';

/**
 * Accepts a file pointer, laods it to disk,
 * and attempts to parse save data
 */
export async function parseSave(file: File): Promise<any | null> {
	const result = await loadFromDisk(file);

	if (!result) {
		return null;
	}

	try {
		return {
			status: parseSaveFilePart(result.status),
			campaign: parseSaveFilePart(result.campaign)
		};
	} catch (error: any) {
		handleAlert(error, 'error deserializing data: ');
		return null;
	}
}

/**
 * Parses a part of raw save file data
 */
export function parseSaveFilePart(data: string) {
	// remove all newlines, tabs, and leading/trailing whitepsace
	const trimmed = data.trim().replace(/[\t\n\r]+/g, ' ');

	return deserializeData(trimmed);
}

/**
 * Loads savefile from disk
 */
export async function loadFromDisk(
	file: File
): Promise<{ status: string; campaign: string } | null> {
	const zip = new JSZip();

	// Load the save file as a zip
	await zip.loadAsync(file);

	try {
		const status = zip.file('status');
		const campaign = zip.file('campaign.scn');
		if (!status || !campaign) {
			throw new Error('invalid, unknown, or possibly corrupt save data');
		}

		return {
			status: await status.async('string'),
			campaign: await campaign.async('string')
		};
	} catch (error: any) {
		handleAlert(error, 'error parsing savefile: ');
		return null;
	}
}
