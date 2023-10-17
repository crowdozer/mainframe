import { useEffect, useState } from 'react'
import type { CodebreakerAPI, SelectionMode, Sequence, Tile } from './types'
import {
	countMatchingElements,
	generateBoard,
	getInitialRemainingMoves,
	getSelectionMode,
} from './utils'

export function useCodebreaker(): CodebreakerAPI {
	/**
	 * Keeps track of all moves that have been made thus far
	 * ["xcoord1-ycoord1", "xcoord2-ycoord2", etc]
	 */
	const [moves, setMoves] = useState<string[]>([])

	/**
	 * Contains all of the board tiles and their states
	 */
	const [board, setBoard] = useState<Tile[][]>([])

	/**
	 * Contains all of the goal sequences the user must click
	 */
	const [sequences, setSequences] = useState<Sequence[]>([])

	/**
	 * Contains the solution path generated
	 */
	const [solution, setSolution] = useState<[number, number][]>([])

	/**
	 * How many moves the user is allowed
	 */
	const [initialRemainingMoves, setInitialRemainingMoves] = useState<number>(0)

	/**
	 * Whether or not the user has won
	 */
	const [victory, setVictory] = useState(false)

	/**
	 * Whether or not the user has lost
	 */
	const [defeat, setDefeat] = useState(false)

	/**
	 * Derive the selection mode
	 * "row" = can only select a cell in the same row
	 * "col" = can only select a cell in the same col
	 *  null = can select anything
	 */
	const selectionMode: SelectionMode = getSelectionMode(moves)

	/**
	 * Derive remaining moves from the initial count - the number of moves made
	 */
	const remainingMoves = initialRemainingMoves - moves.length

	/**
	 * Derive the last row index and last col index
	 * from the array of moves the user has made
	 */
	const [lastRowIndex, lastColIndex] = moves.length
		? moves[moves.length - 1].split('-').map(Number)
		: [0, 0]

	/**
	 * Ran when the user clicks a tile. Ensures the move is valid,
	 * then if it is, adds it to the moves stack. The tiles and score
	 * conditions will be updated automatically.
	 *
	 * @param rowIndex
	 * @param colIndex
	 */
	function selectTile(rowIndex: number, colIndex: number) {
		// Ensure this is a clickable tile
		const tile = board[rowIndex][colIndex]
		if (!tile.clickable) return false

		// Update the moves array with the new move
		setMoves((currMoves) => {
			const newMoves = [...currMoves, `${tile.yCoord}-${tile.xCoord}`]

			return newMoves
		})
	}

	/**
	 * Handles updating the tiles. Iterates over all of the tiles and
	 * updates flags (clickable, clicked, etc).
	 */
	function updateTiles() {
		setBoard((currBoard) => {
			const newBoard = currBoard.map((rowTiles) => {
				return rowTiles.map((tile) => {
					return {
						...tile,
						clickable: isTileClickable(tile),
						clicked: moves.includes(`${tile.yCoord}-${tile.xCoord}`),
					} satisfies Tile
				})
			})

			return newBoard
		})
	}

	/**
	 * Handles updating the sequences. It checks if any sequences should
	 * be marked as completed.
	 */
	function updateSequences() {
		setSequences((currSequences) => {
			return currSequences.map((sequence) => {
				// Nothing needs to happen if it's already solved
				if (sequence.solved) return sequence

				const seqLength = sequence.values.length
				const relevantMoves = getLastNClickedValues(seqLength)

				const matches = countMatchingElements(relevantMoves, sequence.values)
				sequence.progress = matches

				// console.log({
				// 	sequence: sequence.values.join('.'),
				// 	moves: relevantMoves.join('.'),
				// 	matches,
				// })

				if (matches === seqLength) {
					sequence.solved = true
				}

				return sequence
			})
		})
	}

	/**
	 * Returns the last n hex values that were clicked
	 *
	 * @param n number of values to return
	 */
	function getLastNClickedValues(n: number): string[] {
		return moves.slice(n * -1).map((moveStr) => {
			const [yCoord, xCoord] = moveStr.split('-').map(Number)

			return board[yCoord][xCoord].value
		})
	}

	/**
	 * Determines whether the given tile is clickable or not.
	 */
	function isTileClickable(tile: Tile): boolean {
		if (tile.clicked) return false
		if (moves.includes(`${tile.yCoord}-${tile.xCoord}`)) return false 

		switch (selectionMode) {
			case 'col':
				return tile.xCoord === lastColIndex
			case 'row':
				return tile.yCoord === lastRowIndex
		}
	}

	/**
	 * Resets application state
	 */
	function setup() {
		const [sequences, initialBoard, solution] = generateBoard()

		setMoves([])
		setBoard(initialBoard)
		setSequences(sequences)
		setSolution(solution)
		const irm = getInitialRemainingMoves(sequences)
		setInitialRemainingMoves(irm)
		setVictory(false)
		setDefeat(false)
	}

	/**
	 * Run setup on mount
	 */
	useEffect(() => {
		setup()
	}, [])

	/**
	 * Updates the tiles when the 'moves' array changes,
	 * and ensures the defeat condition is tripped if there are
	 * no valid moves left.
	 */
	useEffect(() => {
		if (initialRemainingMoves && remainingMoves === 0) {
			setDefeat(true)
			return
		}

		updateTiles()
		updateSequences()
	}, [moves, remainingMoves, initialRemainingMoves])

	/**
	 * Listen to sequences. If they're all solved, the user wins.
	 */
	useEffect(() => {
		if (!sequences.length) return

		const unsolved = sequences.some((seq) => !seq.solved)

		if (!unsolved) {
			setVictory(true)
		}
	}, [sequences])

	return {
		moves,
		victory,
		defeat,
		sequences,
		board,
		selectionMode,
		remainingMoves,
		initialRemainingMoves,
		solution,
		restart: () => setup(),
		selectTile,
	} satisfies CodebreakerAPI
}
