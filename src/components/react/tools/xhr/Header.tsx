import clsx from 'clsx'
import { type Header as IHeader } from './types'

interface HeaderProps {
	setHeaders: (value: IHeader[] | ((old: IHeader[]) => IHeader[])) => void
	header: IHeader
	headers: IHeader[]
	index: number
}

export default function Header(props: HeaderProps) {
	const { setHeaders, header, headers, index } = props

	function handleUpdateHeaderType(e: any) {
		setHeaders((oldHeaders) => {
			const newHeaders = [...oldHeaders]
			newHeaders[index][0] = e.target.value.trim()
			return newHeaders
		})
	}

	function handleUpdateHeaderContent(e: any) {
		setHeaders((oldHeaders) => {
			const newHeaders = [...oldHeaders]
			newHeaders[index][1] = e.target.value
			return newHeaders
		})
	}

	function handleRemoveHeader() {
		setHeaders((oldHeaders) => {
			return oldHeaders.filter((_, i) => i !== index)
		})
	}

	function checkForError() {
		// both empty is allowed
		if (header[0] === '' && header[1] === '') return false

		// data with no type is not allowed
		if (header[0] === '' && header[1] !== '') return true

		// duplicate types not allowed
		const typeCollision = headers.some(
			(h, i) => h[0] === header[0] && index !== i,
		)
		if (typeCollision) return true

		return false
	}

	function checkForWarning() {
		if (header[0] !== '' && header[1] === '') return true

		return false
	}

	const error = checkForError()

	// generate a random id for the html elements
	const id = 'header-' + Math.random().toString(36)

	return (
		<>
			<input
				className={clsx('border border-neutral-700 bg-transparent px-2 py-1', {
					'border-l-2 border-l-red-500': error,
					'border-l-2 border-l-yellow-500': !error && checkForWarning(),
				})}
				value={header[0]}
				onChange={handleUpdateHeaderType}
				placeholder="name"
				list={`header-${id}-name`}
			/>
			<datalist id={`header-${id}-name`}>
				<option>Accept-Encoding</option>
				<option>Accept</option>
				<option>Authorization</option>
				<option>Cache-Control</option>
				<option>Content-Type</option>
				<option>Cookie</option>
				<option>Host</option>
				<option>Referrer</option>
				<option>Location</option>
				<option>Connection</option>
			</datalist>

			<input
				className="grow border border-neutral-700 bg-transparent px-2 py-1"
				value={header[1]}
				onChange={handleUpdateHeaderContent}
				placeholder="value"
				list={`header-${id}-value`}
			/>
			<datalist id={`header-${id}-value`}>
				{['Accept', 'Content-Type'].includes(header[0]) && (
					<>
						{contentTypeOptions.map(([name, options], index) => (
							<optgroup label={name} key={index}>
								{options.map((option, i) => (
									<option key={i}>{option}</option>
								))}
							</optgroup>
						))}
					</>
				)}
				{header[0] === 'Accept-Encoding' && (
					<>
						{encodingOptions.map((option, i) => (
							<option key={i}>{option}</option>
						))}
					</>
				)}
				{header[0] === 'Cache-Control' && (
					<>
						{cacheOptions.map((option, i) => (
							<option key={i}>{option}</option>
						))}
					</>
				)}
				{header[0] === 'Connection' && (
					<>
						{connectionOptions.map((option, i) => (
							<option key={i}>{option}</option>
						))}
					</>
				)}
			</datalist>
			<button
				className="border border-neutral-700 px-3 py-1 hover:bg-neutral-800"
				onClick={handleRemoveHeader}
			>
				x
			</button>
		</>
	)
}

/**
 * A list of common connection values
 */
const connectionOptions: string[] = ['close', 'keep-alive']

/**
 * A list of common encodings
 */
const encodingOptions: string[] = [
	'gzip',
	'compress',
	'deflate',
	'br',
	'identity',
	'*',
]

/**
 * a list of common cache options
 */
const cacheOptions: string[] = [
	'max-age',
	'max-stale',
	'min-fresh',
	'no-cache',
	'no-store',
	'no-transform',
	'only-if-cached',
	'stale-if-error',
]

/**
 * a list of all standard content types, by category
 */
const contentTypeOptions: [string, string[]][] = [
	[
		'application',
		[
			'application/java-archive',
			'application/EDI-X12',
			'application/EDIFACT',
			'application/javascript',
			'application/octet-stream',
			'application/ogg',
			'application/pdf',
			'application/xhtml+xml',
			'application/x-shockwave-flash',
			'application/json',
			'application/ld+json',
			'application/xml',
			'application/zip',
			'application/x-www-form-urlencoded',
		],
	],
	[
		'audio',
		['audio/mpeg', 'audio/x-ms-wma', 'audio/vnd.rn-realaudio', 'audio/x-wav'],
	],
	[
		'image',
		[
			'image/gif',
			'image/jpeg',
			'image/png',
			'image/tiff',
			'image/vnd.microsoft.icon',
			'image/x-icon',
			'image/vnd.djvu',
			'image/svg+xml',
		],
	],
	[
		'multipart',
		[
			'multipart/mixed',
			'multipart/alternative',
			'multipart/related',
			'multipart/form-data',
		],
	],
	[
		'text',
		[
			'text/css',
			'text/csv',
			'text/html',
			'text/javascript',
			'text/plain',
			'text/xml',
		],
	],
	[
		'video',
		[
			'video/mpeg',
			'video/mp4',
			'video/quicktime',
			'video/x-ms-wmv',
			'video/x-msvideo',
			'video/x-flv',
			'video/webm',
		],
	],
	[
		'vnd',
		[
			'application/vnd.android.package-archive',
			'application/vnd.oasis.opendocument.text',
			'application/vnd.oasis.opendocument.spreadsheet',
			'application/vnd.oasis.opendocument.presentation',
			'application/vnd.oasis.opendocument.graphics',
			'application/vnd.ms-excel',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'application/vnd.ms-powerpoint',
			'application/vnd.openxmlformats-officedocument.presentationml.presentation',
			'application/msword',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'application/vnd.mozilla.xul+xml',
		],
	],
]
