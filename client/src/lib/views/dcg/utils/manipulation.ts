export function isAttacking(status: any): boolean {
	const value = get(status, 'saveinfo.attacking');

	return Array.isArray(value);
}

/**
 * access a given entry in the savefile by a path of keys
 *
 * for example, given this data
 * const data = ["foo", "bar baz", ["qux", "phi", "kappa"]]
 *
 * if you wanted to access the data in foo.qux, you'd use: *
 * get(data, "foo.qux") -> ["phi", "kappa"]
 */
export function get(data: any, keyPath: string): any {
	// Split the keyPath string into an array of keys using "." as a delimiter
	const keys = keyPath.split('.');
	// Get the outer key (the first key in the array) and remove it from the keys array
	const outerKey = keys.shift();

	// Check if the outerKey matches the first element of the data array
	if (outerKey === data[0]) {
		// Get the inner data by removing the first element from the data array
		const innerData = data.slice(1);
		// Reconstruct the inner key by joining the remaining keys in the array
		const innerKey = keys.join('.');

		// Loop through the innerData array
		for (const entry of innerData) {
			// Check if the entry is an array and its first element matches the inner key
			if (Array.isArray(entry) && entry[0] === innerKey) {
				// Return the entry, excluding its first element
				return entry.slice(1);
			}
		}
	}

	// If the function doesn't return before this point, return undefined
	return undefined;
}

/**
 * update a given entry in the savefile by a path of keys
 *
 * for example, given this data
 * const data = ["foo", "bar baz", ["qux", "phi", "kappa"]]
 *
 * if you wanted to remove "phi" and "kappa",
 * data = set(data, "foo.qux", [])
 *
 * you can also use array indexes, so if you want to set "phi" to "pi":
 * data = set(data, "foo.qux[1]", "pi")
 *
 * please note that using array indexes *includes* the 0-th index, which
 * is functionally just the name of the current node.
 */
export function set(data: any, keyPath: string, value: any): any {
	// Split the keyPath string into an array of keys and indices, using "." and "[]" as delimiters
	// ESlint is lying. It's a useful escape character.
	// eslint-disable-next-line no-useless-escape
	const keyParts: (number | string)[] = keyPath.split(/[.\[\]]/).filter((part) => part.length > 0);
	let currentNode = data;

	// The first layer (like saveinfo) doesn't require specification
	if (keyParts[0] === data[0]) {
		keyParts.shift();
	}

	// Loop through the keyParts array
	keyParts.forEach((key, index) => {
		// Check if the key is an array index
		const isArrayIndex = Number.isInteger(parseInt(key as string));
		// Check if the current key is the last part in the keyParts array
		const isLastPart = index === keyParts.length - 1;

		if (isArrayIndex) {
			key = parseInt(key as string);
		}

		if (isLastPart) {
			// If the current key is the last part, update the value in the currentNode
			if (isArrayIndex) {
				currentNode[key] = value;
			} else {
				// Find the index of the node to update
				const nodeIndex = currentNode.findIndex(
					(item: any) => Array.isArray(item) && item[0] === key
				);
				// If the node doesn't exist, create it
				if (nodeIndex === -1) {
					currentNode.push([key, value]);
				} else {
					// If the node exists, update its value
					currentNode[nodeIndex] = Array.isArray(value) ? [key, ...value] : [key, value];
				}
			}
		} else {
			// If the current key is not the last part, move the currentNode to the next level
			let nodeIndex = currentNode.findIndex((item: any) => Array.isArray(item) && item[0] === key);
			// If the next node doesn't exist, create it
			if (nodeIndex === -1) {
				nodeIndex = currentNode.length;
				currentNode.push(isArrayIndex ? [] : [key]);
			}
			// Set the currentNode to the next node
			currentNode = Array.isArray(currentNode[nodeIndex])
				? currentNode[nodeIndex]
				: [currentNode[nodeIndex]];
		}
	});

	return data;
}
