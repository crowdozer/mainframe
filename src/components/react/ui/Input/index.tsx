import clsx from 'clsx'
import { useState, type ReactNode } from 'react'

export interface InputProps {
	/**
	 * ID of the input (optional)
	 * If none is provided, one is generated
	 */
	id?: string
	/**
	 * Label shown above the input (optional)
	 */
	label?: string
	/**
	 * Name of the input
	 */
	name: string
	/**
	 * Placeholder value
	 */
	placeholder?: string
	/**
	 * Value for the input
	 */
	value: HTMLInputElement['value']
	/**
	 * HTML type for the input
	 */
	type?: HTMLInputElement['type']
	/**
	 * Executed on input change
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
		 * Applied to the input element
		 */
		input?: string
	}

	/**
	 * An optional datalist, like so:
	 * <>
	 * 	  <option>option 1</option>
	 * 	  <option>option 2</option>
	 * 	  <option>option 3</option>
	 * </>
	 */
	list?: ReactNode
}

export function Input(props: InputProps) {
	const {
		beforeOnChange,
		disabled = false,
		id = `input-${Math.random().toString(36)}`,
		label = undefined,
		list = undefined,
		name,
		onChange,
		placeholder = undefined,
		type = undefined,
		value: initialValue = '',
	} = props
	const inputClasses = props.classes?.input || ''

	const [value, setValue] = useState<HTMLInputElement['value']>(initialValue)

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
			<input
				id={id}
				value={value}
				name={name}
				type={type}
				placeholder={placeholder}
				className={clsx(
					'border border-neutral-700 bg-transparent px-2 py-1',
					{
						'cursor-not-allowed opacity-50': disabled,
					},
					inputClasses,
				)}
				disabled={disabled}
				onChange={handleChange}
				list={list ? `${id}-datalist` : undefined}
			/>
			{list && <datalist id={`${id}-datalist`}>{list}</datalist>}
		</>
	)
}
