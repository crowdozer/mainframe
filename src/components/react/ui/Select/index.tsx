import clsx from 'clsx'
import { useState, type ReactNode } from 'react'

export interface SelectProps {
	/**
	 * ID of the select (optional)
	 * If none is provided, one is generated
	 */
	id?: string
	/**
	 * Label shown above the select (optional)
	 */
	label?: string
	/**
	 * Name of the select
	 */
	name: string
	/**
	 * Placeholder value
	 */
	placeholder?: string
	/**
	 * Value for the select
	 */
	value: HTMLSelectElement['value']
	/**
	 * Executed on select change
	 *
	 * @param value Value from the event
	 * @param event The event
	 */
	onChange: (value: any, event: any) => void
	/**
	 * Executed before any state updates. Useful if you need to preprocess the value
	 *
	 * @param value Value from the event
	 * @param event The event
	 * @returns the new value
	 */
	beforeOnChange?: (value: any, event: any) => any

	disabled?: boolean

	/**
	 * Class specifying width (i.e w-full, max-w-6xl, etc)
	 */
	width?: string

	/**
	 * Various classes to be applied
	 */
	classes?: {
		/**
		 * Applied to the wrapper
		 */
		wrapper?: string

		/**
		 * Applied to the select element
		 */
		select?: string

		/**
		 * Applied to the input label
		 */
		label?: string
	}
	/**
	 * The select options, like so:
	 * <>
	 * 	  <option>option 1</option>
	 * 	  <option>option 2</option>
	 * 	  <option>option 3</option>
	 * </>
	 */
	children: ReactNode
}
export function Select(props: SelectProps) {
	const {
		beforeOnChange,
		children,
		disabled = false,
		id = `select-${Math.random().toString(36)}`,
		label = undefined,
		name,
		onChange,
		placeholder = undefined,
		value: initialValue = '',
		width = 'max-w-full',
	} = props

	const selectClasses = props.classes?.select || ''
	const wrapperClasses = props.classes?.wrapper || ''
	const labelClasses = props.classes?.label || ''

	const [value, setValue] = useState<HTMLSelectElement['value']>(initialValue)

	function handleChange(event: any) {
		let value = event.target.value

		if (beforeOnChange) {
			value = beforeOnChange(value, event)
		}

		setValue(value)
		onChange(value, event)
	}

	return (
		<div className={width}>
			<div className={clsx('flex flex-col gap-1', wrapperClasses)}>
				{label && (
					<label
						htmlFor={id}
						className={clsx('ml-1 text-sm font-bold', labelClasses)}
					>
						{label}
					</label>
				)}
				<select
					value={value}
					name={name}
					placeholder={placeholder}
					className={clsx(
						'border border-neutral-700 bg-transparent px-2 py-1',
						{
							'cursor-not-allowed opacity-50': disabled,
						},
						selectClasses,
					)}
					onChange={handleChange}
					disabled={disabled}
				>
					{children}
				</select>
			</div>
		</div>
	)
}
