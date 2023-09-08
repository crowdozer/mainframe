import { useMemo } from 'react';
import { get } from '../utils/manipulation';

export default function Mods(props: ModsProps) {
    /**
     * Extracts the mod list and formats it as an array of mod IDs,
     * but only when campaign status changes
     */
    const mods: string[] = useMemo(() => {
		const mods = get(props.status, 'saveinfo.mods');

		if (!mods) return [];

		return mods.map((mod: string) => {
			return mod.split('_')[1].split(':')[0];
		});

    }, [props.status])

    // only show if successful
    if (!mods.length) return null 

    return (
        <div className="mt-4">
            <div className="px-4 border border-neutral-700">
                <div className="p-4">
                    <p>The following mods were detected:</p>
                    <ul>
                        {mods.map((mod, index) => (
                            <li key={index}>
                                <a
                                    href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod}`}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    {mod}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export interface ModsProps {
    status: any 
}
