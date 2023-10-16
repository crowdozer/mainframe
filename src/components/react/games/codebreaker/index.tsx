import { Accordion, Button, cn } from '../../ui'
import { useCodebreaker } from './useCodebreaker'
import { getDefeatMessage, getIdleMessage, getVictoryMessage } from './utils'

export default function Codebreaker() {
	const api = useCodebreaker()

	const {
		sequences,
		board,
		solution,
		remainingMoves,
		initialRemainingMoves,
		selectTile,
		moves,
		victory,
		defeat,
		restart,
	} = api

	return (
		<>
			<div className="block lg:hidden">
				<p>
					This page requires a larger desktop view. Please make your browser
					larger - this is not small-screen friendly yet.
				</p>
			</div>
			<div className="mt-8 hidden lg:block">
				<div>
					<p className="text-xl font-bold">INTRUSION DETECTION</p>
					<div className="flex flex-row-reverse flex-wrap gap-1">
						<div className="grow"></div>
						{Array.from({ length: initialRemainingMoves }, (_, index) => (
							<div
								key={index}
								className={cn('border p-6', {
									// Remaining move available
									'border-neutral-800/50 bg-neutral-800/25':
										remainingMoves > index,
									// Move is not available
									'border-yellow-800/50 bg-yellow-800/25':
										remainingMoves <= index,
									// Victory
									'border-green-500/50 bg-green-500/25': victory,
									// Defeat
									'border-red-500/50 bg-red-500/25': defeat,
								})}
							/>
						))}
					</div>
				</div>

				<div className="mt-8 flex flex-row-reverse gap-8">
					<div className="grow"></div>

					<div>
						<p className="text-xl font-bold">INJECTION VECTORS</p>
						<table>
							<tbody>
								{sequences.map((seq, seqIndex) => (
									<tr key={seqIndex}>
										{seq.values.map((hex, hexIndex) => (
											<td key={hexIndex} className="p-0.5 text-center">
												<div
													className={cn('border  p-2 px-4', {
														'border-red-800/50 bg-red-800/25': !seq.solved,
														// Defeat squares
														'border-red-500/50 bg-red-500/25': defeat,
														// Solved sequences override defeat squares
														'border-green-800/50 bg-green-800/25':
															seq.solved || seq.progress > hexIndex,
														// Victory squares
														'border-green-500/50 bg-green-500/25': victory,
													})}
												>
													{hex}
												</div>
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div>
						<p className="text-xl font-bold">SYSTEM MEMORY</p>
						<table>
							<tbody>
								{board.map((row, rowIndex) => (
									<tr key={rowIndex}>
										{row.map((col, colIndex) => (
											<td className="p-0.5" key={colIndex}>
												<Button
													classes={{
														button: cn('w-full border  p-4', {
															// First move classes
															'border-neutral-800/50 bg-neutral-800/25':
																!moves.length,
															// Clickable classes
															'border-red-800/25 bg-red-800/10 hover:bg-red-800/25 hover:border-red-800/50':
																col.clickable && moves.length,
															// Unclickable classes
															'border-neutral-800/50 bg-neutral-900/25':
																!col.clickable,
															// Already clicked classes
															'border-green-800/50 bg-green-900/25':
																col.clicked,
															// Victory
															'border-green-500/50 bg-green-500/25': victory,
															// Defeat
															'border-red-500/50 bg-red-500/25': defeat,
														}),
													}}
													onClick={() => selectTile(col.yCoord, col.xCoord)}
													disabled={!col.clickable || victory || defeat}
												>
													{col.value}
												</Button>
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className="mt-8">
					<p className="text-xl font-bold">STATUS</p>
					{defeat && (
						<div>
							<p className="mb-2 text-red-500">{getDefeatMessage()}</p>
							<Button onClick={restart}>try again</Button>
						</div>
					)}
					{victory && (
						<div>
							<p className="mb-2 text-green-500">{getVictoryMessage()}</p>
							<Button onClick={restart}>play again</Button>
						</div>
					)}
					{!defeat && !victory && !moves.length && (
						<div>
							<p className="text-blue-500">{getIdleMessage()}</p>
						</div>
					)}
					{!defeat && !victory && moves.length > 0 && (
						<div>
							<p className="text-yellow-500">hacking...</p>
						</div>
					)}
				</div>

				<div className="mt-16 space-y-4">
					<Accordion label="FAQ" defaultOpen>
						<div className="space-y-4 bg-neutral-800/25 p-4 font-mono text-sm">
							<p>
								You need to solve for the injection vectors by clicking memory
								addresses in the correct order. You can complete them in any
								order you like.
							</p>
							<p>
								The game alternates between moving laterally and moving
								vertically. Your first move can be anywhere, the second one must
								be in the same column, then the same row, then column, then row,
								and so forth.
							</p>
							<p>
								When you complete a vector, it is locked into a success state.
								If you make an incorrect guess, any partially solved vectors are
								reset.
							</p>
							<p>
								If you run out of moves, you're detected and it's game over.
							</p>
							<p>Inspired by the Cyberpunk 2077 hacking minigame.</p>
						</div>
					</Accordion>
					<Accordion label="Solution">
						<div className="flex flex-row flex-wrap gap-1 font-mono text-sm">
							{solution.map(([row, col], index) => {
								return (
									<div
										key={index}
										className="border border-neutral-800/50 bg-neutral-800/25 px-2 py-3"
									>
										(r{row + 1}, c{col + 1})
									</div>
								)
							})}
						</div>
					</Accordion>
				</div>
			</div>
		</>
	)
}
