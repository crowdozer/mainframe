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
 * Serialize a given data array into a the custom GOH format
 *
 * The function handles nested arrays and ensures proper indentation for readability.
 * For arrays with 5 or fewer keys, items are kept on the same line.
 * For arrays with more than 5 keys, items are placed on separate lines.
 * This behavior is not guaranteed to mimick vanilla savefiles, but it should be compatible.
 *
 * @param data The data array to be serialized.
 * @returns The serialized data as a string.
 */
export function serializeData(data: any): string {
	// Recursively serializes the data array
	function serializeRecursively(data: any, indent = 0): string {
		if (Array.isArray(data)) {
			// If it's an array, first open the array, then process all keys
			let result = '{';
			for (let i = 0; i < data.length; i++) {
				if (shouldAddNewline(data, i)) {
					// If necessary, add a new line and indent
					result += getIndentation(indent + 1);
				} else if (i > 0) {
					// Otherwise, just add a space unless we're on the final item.
					result += ' ';
				}
				// Recursion
				result += serializeRecursively(data[i], indent + 1);
			}

			// The following ensures that newlines are only generated if
			// there are more than 5 items, OR if there is another array.
			if (data.length <= 5 && !data.some(Array.isArray)) {
				result += '}';
			} else {
				result += getIndentation(indent) + '}';
			}
			return result;
		} else {
			// Otherwise, if it's not an array, just return the value
			return data;
		}
	}

	return serializeRecursively(data);
}

/**
 * Determines if a newline should be added before a data item based on indentation level, data array, and index.
 *
 * @param data The data array being processed.
 * @param index The index of the current data item.
 * @returns A boolean indicating if a newline should be added.
 */
function shouldAddNewline(data: any[], index: number): boolean {
	// If not first index and either (>5 items, array is present)
	if (index > 0 && (data.length > 5 || data.some(Array.isArray))) {
		return true;
	}

	// If first index and first item is array
	if (index === 0 && Array.isArray(data[0])) {
		return true;
	}

	return false;
}

/**
 * Returns a string with the appropriate number of tabs for the given indentation level.
 *
 * @param indent The indentation level.
 * @returns A string containing newline and tabs for the given indentation level.
 */
function getIndentation(indent: number): string {
	return '\n' + '\t'.repeat(indent);
}
