import { useState } from 'react'
import { type Header as IHeader } from './types'
import Header from './Header'

interface HeadersProps {
	headers: IHeader[]
	numActiveHeaders: number
	setHeaders: (value: IHeader[] | ((old: IHeader[]) => IHeader[])) => void
	handleAddHeader: () => void
}

export default function Headers(props: HeadersProps) {
	const { headers, setHeaders, handleAddHeader, numActiveHeaders } = props
	const [open, setOpen] = useState(true)

	return (
		<div className="flex flex-col gap-1">
			<div
				className="flex cursor-pointer flex-row bg-neutral-800 p-2 py-1 hover:bg-neutral-700"
				onClick={() => setOpen(!open)}
			>
				<p className="font-bold">headers ({numActiveHeaders})</p>
				<div className="grow"></div>
				<p>{open ? 'v' : '>'}</p>
			</div>

			{open && (
				<div className="flex flex-col gap-1">
					{headers.map((header, index) => (
						<div
							className="flex flex-row gap-1 border border-transparent"
							key={index}
						>
							<Header
								headers={headers}
								header={header}
								index={index}
								setHeaders={setHeaders}
							/>
						</div>
					))}

					<button
						className="border border-neutral-700 px-2 py-1 hover:bg-neutral-800"
						onClick={handleAddHeader}
					>
						+ new
					</button>
				</div>
			)}
		</div>
	)
}
