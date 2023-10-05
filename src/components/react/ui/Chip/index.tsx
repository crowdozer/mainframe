import clsx from 'clsx'
import { type ReactNode } from 'react'

export default interface ChipProps {
	kind: 'success' | 'error' | 'warning' | 'info' | 'neutral'
	children: ReactNode
}

export function Chip(props: ChipProps) {
	const { kind = 'neutral', children } = props

	return (
		<div
			className={clsx(
				'self-center rounded-full px-3 py-0.5 text-sm font-thin',
				{
					'bg-neutral-500/25': kind === 'neutral',
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
