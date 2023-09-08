import { useMemo } from 'react';
import { get } from '../utils/manipulation';
import { maps } from '../utils/maps';

export default function Maps(props: MapsProps) {
	/**
	 * Extracts the map list (map ID strings),
	 * but only when campaign status changes
	 */
	const results: string[] = useMemo(() => {
		const mapPoints = get(props.status, 'saveinfo.mapPoints');
		const mapList = [];

		for (const mapPoint of mapPoints) {
			const data = ['mappoint', ...mapPoint];
			const map = get(data, 'mappoint.map');

			if (map) {
				const regex = /multi\/(\w+):/;
				const match = regex.exec(map[0]);
				if (match) {
					const result = match[1];

					mapList.push(result);
				}
			}
		}

		return mapList;
	}, [props.status]);

	return (
		<div className="grid grid-cols-3 gap-4">
			{results.map((map, index) => (
				<div key={index} className="relative rounded border border-neutral-700">
					<img
						src={`/images/goh/maps/${map}.webp`}
						alt={map}
						className="w-full"
					/>
					<div className="border-t border-neutral-700 p-2 px-4">
						<h1 className="text-lg">{maps[map]}</h1>
						<h2>{map}</h2>
					</div>
				</div>
			))}
		</div>
	);
}

export interface MapsProps {
	status: any;
}
