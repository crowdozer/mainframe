import { useState } from 'react';
import { get, set, isAttacking } from './utils/manipulation';
import { exportFile } from './utils/exportFile';
import { parseSave } from './utils/parseSaveFile';

/**
 * Returns an API to power the save editor
 */
export function useEditor(): EditorAPI {
	// savefile data (parsed)
	const [data, setData] = useState<Campaign>(defaultData);

	// whether or not the savefile has loaded properly
	const loaded = data.campaign && data.status;

	// whether or not the user is attacking next
	const attacking = loaded ? isAttacking(data.status) : false;

	/**
	 * Handles importing of saves
	 */
	async function handleParseSave(event: any) {
		const file = event.target.files[0];
		const parsed = await parseSave(file);
		setData(parsed as Campaign);
	}

	/**
	 * Handles exporting of saves
	 */
	function handleExport() {
		exportFile('new.sav', data);
	}

	/**
	 * Editor form input change
	 */
	function handleInputChange(event: any) {
		const { name, value } = event.target;

		setData((old) => ({
			...old,
			status: set(data.status, name, value),
		}));
	}

	/**
	 * Resets everything
	 */
	function handleClear() {
		setData(defaultData);
	}

	return {
		// state
		data,
		loaded,
		attacking,
		// fns
		handleParseSave,
		handleExport,
		handleInputChange,
		handleClear,
	};
}

/**
 * Support data structures
 */

export const defaultData: Campaign = {
	campaign: null,
	status: null,
};

/**
 * Supporting types
 */

export interface EditorAPI {
	data: Campaign;
	loaded: boolean;
	attacking: boolean;

	handleParseSave: (event: any) => void;
	handleExport: () => void;
	handleInputChange: (event: any) => void;
	handleClear: () => void;
}

export interface Campaign {
	campaign: any;
	status: any;
}
