export interface Sequence {
	// The hex values in the sequence
	values: string[]
	// If the sequence is solved or not
	solved: boolean
	// How far the user is into solving the sequence
	progress: number
}

export interface Tile {
	value: string
	xCoord: number
	yCoord: number
	clicked: boolean
	clickable: boolean
}

export type SelectionMode = 'row' | 'col'

export type CodebreakerBoard = Tile[][]

export interface CodebreakerAPI {
	victory: boolean
	defeat: boolean
	// The moves that have been made so far
	moves: string[]
	// The "goal" sequences the user must solve for
	sequences: Sequence[]
	// The solution that was generated: [row,col][]
	solution: [number, number][]
	// The grid the user must solve within
	board: CodebreakerBoard
	// Whether the user must select along the current row, or col, or anywhere
	selectionMode: SelectionMode
	// How many moves the user has left
	remainingMoves: number
	// How many moves the user was allocated
	initialRemainingMoves: number
	// Allows the user to restart
	restart: () => void
	// Select a given tile
	selectTile: (row: number, col: number) => void
}
