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

	return (
		<>
			<input
				className={clsx('border border-neutral-700 bg-transparent px-2 py-1', {
					'border-l-2 border-l-red-500': error,
					'border-l-2 border-l-yellow-500': !error && checkForWarning(),
				})}
				value={header[0]}
				id="xhr-url"
				onChange={handleUpdateHeaderType}
				placeholder="name"
			/>
			<input
				className="grow border border-neutral-700 bg-transparent px-2 py-1"
				value={header[1]}
				id="xhr-url"
				onChange={handleUpdateHeaderContent}
				placeholder="value"
			/>
			<button
				className="border border-neutral-700 px-3 py-1 hover:bg-neutral-800"
				onClick={handleRemoveHeader}
			>
				x
			</button>
		</>
	)
}
