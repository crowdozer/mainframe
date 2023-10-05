import clsx from 'clsx'
import { type ReactNode } from 'react'

export default interface MessageProps {
	kind: 'success' | 'error' | 'warning' | 'info'
	children: ReactNode
}

export function Message(props: MessageProps) {
	const { kind = 'info', children } = props

	return (
		<div
			className={clsx(
				'border border-transparent  bg-neutral-800 px-2 py-1 text-sm font-thin',
				{
					'border-l-yellow-500': kind === 'warning',
					'border-l-green-500': kind === 'success',
					'border-l-red-500': kind === 'error',
					'border-l-blue-500': kind === 'info',
				},
			)}
		>
			{children}
		</div>
	)
}
