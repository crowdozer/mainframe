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
	 * Various classes to be applied
	 */
	classes?: {
		/**
		 * Applied to the select element
		 */
		select?: string
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
	} = props
	const selectClasses = props.classes?.select || ''

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
		<>
			{label && <label htmlFor={id}>{label}</label>}
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
		</>
	)
}
