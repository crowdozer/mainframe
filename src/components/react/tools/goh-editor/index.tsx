import { useEditor } from './useEditor'
import Mods from './components/Mods'
import Maps from './components/Maps'
import { get } from './utils/manipulation'
import { Button, Code, Input, Message } from '@/components/react/ui'

export default function GohEditor() {
	const {
		data,
		loaded,
		attacking,
		handleParseSave,
		handleExport,
		handleInputChange,
		handleClear,
	} = useEditor()

	return (
		<div className="space-y-8">
			<p>
				This utility allows you to edit certain values in Gates of Hell
				savefiles. Currently, it supports MP, AP, RP, and SP. You may also
				change your campaign name, and view the next maps in rotation.
			</p>

			{/* Uploader */}
			{!loaded && (
				<div>
					<p>To begin, locate your savefile.</p>
					<p>Save files are commonly located at:</p>
					<div className="my-4 border border-neutral-700 bg-neutral-950/25 p-4 font-mono">
						Documents\my games\gates of hell\profiles\(steam
						id)\campaign\(file).sav
					</div>
					<div>
						<input type="file" name="files" onChange={handleParseSave} />
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
										<Input
											key={index}
											name={path}
											label={label}
											onChange={(value, event) => handleInputChange(event)}
											value={get(data.status, path)}
										/>
									))}
								</div>
							</div>
						</div>

						{/* Controls */}
						<div className="mt-4 space-x-4 text-right">
							<Button onClick={handleClear}>clear</Button>
							<Button onClick={handleExport}>export</Button>
						</div>
					</div>
				</>
			)}

			{/* Disclaimer Msg */}
			<div className="space-y-4">
				<Message kind="info">
					<p>
						It appears that the map preview is bugged in the game itself, as
						they are re-rolled each time the save is loaded.
					</p>
				</Message>
				<Message kind="warning">
					<p>Please back up your save before using this utility.</p>
					<p>This utility does not validate what you type.</p>
					<p>Please use common sense for values that you enter.</p>
					<p className="mt-3">I am not liable for damages to your savegame.</p>
				</Message>
			</div>
		</div>
	)
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
]
