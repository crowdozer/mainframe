import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { serializeData } from './parseSaveFile';

/**
 * Accepts an unserialized savegame, serializes it, writes it to zip
 */
export async function exportFile(filename: string, savegame: { status: any; campaign: any }) {
	// serialize the files
	const status = serializeData(savegame.status);
	const campaign = serializeData(savegame.campaign);

	// Create a new zip file with the edited files
	const newZip = new JSZip();

	newZip.file('status', status);
	newZip.file('campaign.scn', campaign);

	// Generate the new zip file for download
	const newZipBlob = await newZip.generateAsync({ type: 'blob' });

	saveAs(newZipBlob, filename);
}
