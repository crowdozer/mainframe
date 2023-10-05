import clsx from 'clsx'
import { type ReactNode } from 'react'

export default interface ChipProps {
	kind: 'success' | 'error' | 'warning' | 'info'
	children: ReactNode
}

export function Chip(props: ChipProps) {
	const { kind = 'info', children } = props

	return (
		<div
			className={clsx(
				'self-center rounded-full px-3 py-0.5 text-sm font-thin',
				{
					'bg-yellow-500/25': kind === 'warning',
					'bg-green-500/25': kind === 'success',
					'bg-red-500/25': kind === 'error',
					'bg-blue-500/25': kind === 'info',
				},
			)}
		>
			{children}
		</div>
	)
}
