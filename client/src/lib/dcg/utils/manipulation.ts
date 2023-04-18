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
	const keys = keyPath.split('.');
	const outerKey = keys.shift();

	if (outerKey === data[0]) {
		const innerData = data.slice(1);
		const innerKey = keys.join('.');

		for (const entry of innerData) {
			if (Array.isArray(entry) && entry[0] === innerKey) {
				return entry.slice(1);
			}
		}
	}

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
	// ESlint is lying. It's a useful escape character.
	// eslint-disable-next-line no-useless-escape
	const keyParts: (number | string)[] = keyPath.split(/[.\[\]]/).filter((part) => part.length > 0);
	let currentNode = data;

	keyParts.forEach((key, index) => {
		const isArrayIndex = Number.isInteger(parseInt(key as string));
		const isLastPart = index === keyParts.length - 1;

		if (isArrayIndex) {
			key = parseInt(key as string);
		}

		if (isLastPart) {
			if (isArrayIndex) {
				currentNode[key] = value;
			} else {
				const nodeIndex = currentNode.findIndex(
					(item: any) => Array.isArray(item) && item[0] === key
				);
				if (nodeIndex === -1) {
					currentNode.push([key, value]);
				} else {
					currentNode[nodeIndex] = Array.isArray(value) ? [key, ...value] : [key, value];
				}
			}
		} else {
			let nodeIndex = currentNode.findIndex((item: any) => Array.isArray(item) && item[0] === key);
			if (nodeIndex === -1) {
				nodeIndex = currentNode.length;
				currentNode.push(isArrayIndex ? [] : [key]);
			}
			currentNode = Array.isArray(currentNode[nodeIndex])
				? currentNode[nodeIndex]
				: [currentNode[nodeIndex]];
		}
	});

	return data;
}
