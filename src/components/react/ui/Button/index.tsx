import type { ReactNode } from 'react'
import clsx from 'clsx'

export interface ButtonProps {
	/**
	 * Button content
	 */
	children: ReactNode
	/**
	 * OnClick handler
	 *
	 * @param event Click event
	 */
	onClick?: (event: any) => void

	disabled?: boolean

	/**
	 * Various classes to be applied
	 */
	classes?: {
		/**
		 * Applied to the button element
		 */
		button?: string
	}
}

export function Button(props: ButtonProps) {
	const { onClick = undefined, disabled = false, children } = props
	const buttonClasses = props.classes?.button || ''

	return (
		<button
			className={clsx(
				'border border-neutral-700 px-3 py-1 hover:bg-neutral-800',
				{
					'cursor-not-allowed opacity-50': disabled,
				},
				buttonClasses,
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}
