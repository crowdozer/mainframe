import { useState } from 'react'

export default function FAQ() {
	const [open, setOpen] = useState(false)

	return (
		<>
			<div className="flex flex-col gap-1">
				<div
					className="flex cursor-pointer flex-row bg-neutral-800 px-2 py-1 hover:bg-neutral-700"
					onClick={() => setOpen(!open)}
				>
					<p className="font-bold">FAQ</p>
					<div className="grow"></div>
					<p>{open ? 'v' : '>'}</p>
				</div>

				{open && (
					<div className="space-y-2">
						<div className="border border-neutral-800 bg-neutral-950/25 px-4 py-2">
							<p className="font-bold">What is it?</p>
							<p>it's like the bollywood version of postman</p>
						</div>
						<div className="border border-neutral-800 bg-neutral-950/25 px-4 py-2">
							<p className="font-bold">Is this complete?</p>
							<p>no but you can still try to use it</p>
						</div>
						<div className="border border-neutral-800 bg-neutral-950/25 px-4 py-2">
							<p className="font-bold">Roadmap?</p>
							<ul>
								<li>error handling</li>
								<li>presets</li>
								<li>better validation</li>
								<li>responsiveness</li>
								<li>syntax highlighting in response</li>
								<li>more payload types (x-www)</li>
								<li>refactor everything when done</li>
							</ul>
						</div>
						<div className="border border-neutral-800 bg-neutral-950/25 px-4 py-2">
							<p className="font-bold">Timeframe?</p>
							<p>no</p>
						</div>
						<div className="border border-neutral-800 bg-neutral-950/25 px-4 py-2">
							<p className="font-bold">A11Y?</p>
							<p>not in the budget</p>
						</div>
						<div className="border border-neutral-800 bg-neutral-950/25 px-4 py-2">
							<p className="font-bold">It did something weird</p>
							<p>email me or open a github issue</p>
						</div>
					</div>
				)}
			</div>
		</>
	)
}
