import { useState, type ReactNode } from 'react'

interface AccordionProps {
	label?: string
	openIndicator?: string
	closedIndicator?: string
	defaultOpen?: boolean
	children: ReactNode
}

export function Accordion(props: AccordionProps) {
	const {
		label = '',
		openIndicator = 'v',
		closedIndicator = '>',
		children,
		defaultOpen = false,
	} = props

	const [open, setOpen] = useState(defaultOpen)

	return (
		<div className="flex flex-col gap-1">
			<div
				className="flex cursor-pointer flex-row bg-neutral-800 p-2 py-1 hover:bg-neutral-700"
				onClick={() => setOpen(!open)}
			>
				<p className="font-bold">{label}</p>
				<div className="grow"></div>
				<p>{open ? openIndicator : closedIndicator}</p>
			</div>

			{open && <div className="flex flex-col gap-1">{children}</div>}
		</div>
	)
}
