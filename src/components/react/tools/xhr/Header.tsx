import clsx from 'clsx'
import { type Header as IHeader } from './types'
import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'

interface HeaderProps {
	handleRemove: () => void
	handleSetType: (value: string) => void
	handleSetContent: (value: string) => void
	header: IHeader
	loading: boolean
	index: number
}

export default function Header(props: HeaderProps) {
	const { handleSetContent, handleSetType, handleRemove, header, loading } =
		props

	return (
		<>
			<Input
				width="grow"
				classes={{
					input: clsx('border border-neutral-700 bg-transparent px-2 py-1', {
						'border-l-2 border-l-red-500': header.hasError,
						'border-l-2 border-l-yellow-500':
							!header.hasError && header.hasWarning,
					}),
				}}
				value={header.name}
				name="header name"
				placeholder="header name"
				onChange={(value) => handleSetType(value)}
				disabled={loading}
				list={
					<>
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
					</>
				}
			/>

			<Input
				width="grow"
				classes={{
					input: 'border border-neutral-700 bg-transparent px-2 py-1',
				}}
				value={header.value}
				name="header value"
				placeholder="header value"
				onChange={(value) => handleSetContent(value)}
				disabled={loading}
				list={
					<>
						{['Accept', 'Content-Type'].includes(header.name) && (
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
						{header.name === 'Accept-Encoding' && (
							<>
								{encodingOptions.map((option, i) => (
									<option key={i}>{option}</option>
								))}
							</>
						)}
						{header.name === 'Cache-Control' && (
							<>
								{cacheOptions.map((option, i) => (
									<option key={i}>{option}</option>
								))}
							</>
						)}
						{header.name === 'Connection' && (
							<>
								{connectionOptions.map((option, i) => (
									<option key={i}>{option}</option>
								))}
							</>
						)}
					</>
				}
			/>

			<Button onClick={handleRemove} disabled={loading}>
				x
			</Button>
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
