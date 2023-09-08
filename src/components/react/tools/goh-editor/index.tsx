import { useEditor } from './useEditor';
import Mods from './components/Mods';
import Maps from './components/Maps';
import { get } from './utils/manipulation';

export default function GohEditor() {
	const {
		data,
		loaded,
		attacking,
		handleParseSave,
		handleExport,
		handleInputChange,
		handleClear,
	} = useEditor();

	return (
		<>
			<h1 className="text-4xl">Gates of Hell Editor</h1>
			<h2 className="mt-2 text-neutral-400">
				web gui for Gates of Hell: Ostfront savefiles
			</h2>

			{/* Disclaimer Msg */}
			<div className="mt-8">
				<div className="border border-neutral-500 px-4">
					<div className="p-4">
						<p className="mb-2 font-bold text-yellow-500">NOTICE</p>
						<p>Please back up your save before using this utility.</p>
						<p>This utility does not validate what you type.</p>
						<p>Please use common sense for values that you enter.</p>
						<p className="mt-3">
							I am not liable for damages to your savegame.
						</p>
					</div>
				</div>
			</div>

			{/* Uploader */}
			{!loaded && (
				<div className="{data ? 'hidden' : 'block'}">
					<div className="mt-8">
						<p>To begin, locate your savefile.</p>
						<p>Save files are commonly located at:</p>
						<div className=" my-4 bg-neutral-950/25 p-4 font-mono">
							<p className=" text-green-500 ">
								Documents\my games\gates of hell\profiles\(steam
								id)\campaign\(file).sav
							</p>
						</div>
						<div>
							<input type="file" name="files" onChange={handleParseSave} />
						</div>
					</div>
				</div>
			)}

			{/* Savegame Editor */}
			{loaded && (
				<>
					<Mods status={data.status} />
					<div>
						{/* Maps */}
						<div className="mt-4">
							<div className="border border-neutral-700 px-4">
								<div className="flex flex-col gap-2 p-4">
									<h3 className="text-lg">
										Upcoming Maps{' '}
										<span className="ml-2 text-base text-neutral-400">
											{attacking ? 'attacking' : 'defending'}
										</span>
									</h3>
									<Maps status={data.status} />
								</div>
							</div>
						</div>

						{/* Campaign State */}
						<div className="mt-4">
							<div className="border border-neutral-700 px-4">
								<div className="flex flex-col gap-4 p-4">
									<h3 className="text-lg">Campaign State</h3>
									{resourceForm.map(([path, label], index) => (
										<div key={index}>
											<label className="mb-1 block text-sm font-bold">
												{label}
											</label>
											<input
												className="rounded border  border-neutral-700 bg-transparent p-2 px-4"
												name={path}
												onChange={handleInputChange}
												value={get(data.status, path)}
											/>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Controls */}
						<div className="mt-4 space-x-4 text-right">
							<button
								className="rounded bg-neutral-800 p-2 px-4 hover:bg-neutral-700"
								onClick={handleClear}
							>
								clear
							</button>
							<button
								className="rounded bg-neutral-800 p-2 px-4 hover:bg-neutral-700"
								onClick={handleExport}
							>
								export
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}

/**
 * Support data structures
 */

export const resourceForm = [
	['saveinfo.name', 'Name'],
	['saveinfo.mp', 'MP (purchasing power)'],
	['saveinfo.rp', 'RP (research points)'],
	['saveinfo.ap', 'AP (ammo points)'],
	['saveinfo.sp', 'SP (special points)'],
];
