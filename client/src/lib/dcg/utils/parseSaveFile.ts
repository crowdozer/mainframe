import JSZip from 'jszip';

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
	} catch (error) {
		console.log('error deserializing data');
		console.error(error);
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
 * Performs deserialization on save data
 */
export function deserializeData(input: string): any {
	function splitRecursively(str: string): any {
		const result = [];
		let start = 0;
		let level = 0;
		let isProperty = false;
		let inQuotes = false;

		for (let i = 0; i < str.length; i++) {
			// Toggle 'inQuotes' when encountering a double quote character
			if (str[i] === '"') {
				inQuotes = !inQuotes;
			}
			// When encountering an opening brace, and not within quotes
			else if (str[i] === '{' && !inQuotes) {
				// If at level 0 (same depth), add the current property to the result
				if (level === 0) {
					if (i > start) {
						const part = str.slice(start, i).trim();
						if (part) result.push(part);
					}
					start = i + 1;
				}
				level++;
				isProperty = false;
			}
			// When encountering a closing brace, and not within quotes
			else if (str[i] === '}' && !inQuotes) {
				level--;
				if (level === 0) {
					// If at level 0, split the content within the braces recursively
					result.push(splitRecursively(str.slice(start, i)));
					start = i + 1;
					isProperty = true;
				}
			}
			// When encountering a space character, and not within quotes or nested properties
			else if (str[i] === ' ' && level === 0 && !inQuotes) {
				if (!isProperty) {
					const part = str.slice(start, i).trim();
					if (part) result.push(part);
					start = i + 1;
				}
			}
		}

		// Add any remaining properties after the loop ends
		if (start < str.length) {
			const part = str.slice(start).trim();
			if (part) result.push(part);
		}

		return result;
	}

	return splitRecursively(input.slice(1, -1));
}

/**
 * Reserializes save data
 */
export function serializeData(data: any): string {
	function getIndentation(indent: number): string {
		return '\n' + '\t'.repeat(indent);
	}

	function serializeRecursively(data: any, indent = 0): string {
		if (Array.isArray(data)) {
			let result = '{';
			for (let i = 0; i < data.length; i++) {
				result += getIndentation(indent + 1);
				result += serializeRecursively(data[i], indent + 1);
			}
			result += getIndentation(indent) + '}';
			return result;
		} else {
			return data;
		}
	}

	return serializeRecursively(data);
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
	} catch (error) {
		console.log('error parsing savefile');
		console.error(error);
		return null;
	}
}
