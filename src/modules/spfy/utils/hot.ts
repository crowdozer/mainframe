import { getProgressRenderData } from './shared'

/**
 * see module readme for an explanation
 */

// keeps me from doing stupid stuff
type TConfig = {
	playerElement: HTMLElement
	textElement: HTMLElement
	progressElement: HTMLElement
	nonce: string
	duration: number
	progress: number
}

// controls how fast the frontend ticks
const TICK_DURATION = 1000

// holds all required data
let config: TConfig | null = null

/**
 * attempts to grab all required dom elements and data attributes
 */
function init() {
	const playerElement = document.getElementById('spfy-player')
	if (!playerElement) return

	const textElement = playerElement.querySelector('#spfy-player-progress-text') // prettier-ignore
	const progressElement = playerElement.querySelector('#spfy-player-progress-bar') // prettier-ignore
	if (!textElement || !progressElement) return

	config = {
		playerElement, // @ts-ignore
		textElement, // @ts-ignore
		progressElement, // @ts-ignore
		duration: Number(playerElement.getAttribute('data-duration')),
		progress: Number(playerElement.getAttribute('data-progress')),
		nonce: String(playerElement.getAttribute('data-nonce')),
	}
}

/**
 * attempts to render new dom information
 */
function render(duration: number, progress: number): void {
	// sanity check
	if (!config) return

	const { progressPercent, progressText } = getProgressRenderData(
		progress,
		duration,
	)

	config.textElement.textContent = progressText
	config.progressElement.style.width = `${progressPercent}%`
}

/**
 * intended to run every second, to simulate live playback state
 *
 * 1. load config, if necessary
 * 2. check data-paused for truthiness
 * 3. check data-nonce for changes
 * 4. simulate the tick, clamped to max duration
 */
function tick(): void {
	// try to load config if necessary
	if (!config) init()
	if (!config) return
	// console.log('tick', config)

	// we've paused, don't do anything else
	const isPlaying = config.playerElement.getAttribute('data-playing') === 'true'
	if (!isPlaying) {
		// console.log('paused')
		return
	}

	// we're not paused, everything's good.
	// now check if the server updated, or if we should keep simulating
	const newNonce = String(config.playerElement.getAttribute('data-nonce'))
	if (newNonce !== config.nonce) {
		// console.log('new data')

		// the server updated, we have new canonical information
		config.nonce = newNonce
		config.duration = Number(config.playerElement.getAttribute('data-duration'))
		config.progress = Number(config.playerElement.getAttribute('data-progress'))
		return render(config.duration, config.progress)
	}

	// pretend we've ticked 1 second
	config.progress += TICK_DURATION
	// prevents ui glitchyness at end of song & pause
	if (config.progress > config.duration) {
		config.progress = config.duration
	}

	return render(config.duration, config.progress)
}

// shouldn't have to worry about clearing this
const interval = setInterval(tick, TICK_DURATION)
