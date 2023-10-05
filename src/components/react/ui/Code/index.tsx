import clsx from 'clsx'

export interface CodeProps {
	content?: string

	/**
	 * Various classes to be applied
	 */
	classes?: {
		/**
		 * Applied to the wrapper element
		 */
		wrapper?: string
	}
}

export function Code(props: CodeProps) {
	const { content = '' } = props

	const wrapperClasses = props.classes?.wrapper || ''
	const lines = content.split('\n')

	return (
		<pre
			className={clsx(
				'resize-y overflow-auto border border-neutral-700',
				wrapperClasses,
			)}
		>
			{lines.map((line, index) => (
				<div
					key={index}
					className="grid grid-cols-[minmax(32px,_max-content)_1fr] gap-2"
				>
					<span
						className={clsx(
							'border-r border-r-neutral-800 bg-neutral-800/50 px-2 text-right',
							{
								'pt-4': index === 0,
								'pb-4': index === lines.length - 1,
							},
						)}
					>
						{index + 1}
					</span>
					<span
						className={clsx({
							'pt-4': index === 0,
							'pb-4': index === lines.length - 1,
						})}
					>
						{line}
					</span>
				</div>
			))}
		</pre>
	)
}
