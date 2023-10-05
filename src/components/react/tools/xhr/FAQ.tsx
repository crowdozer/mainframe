import { Accordion } from '@/components/react/ui/Accordion'

export default function FAQ() {
	return (
		<Accordion label="FAQ">
			<div className="space-y-2">
				<div className="border border-neutral-800 bg-neutral-950/25 px-4 py-2">
					<p className="font-bold">What is it?</p>
					<p>It's a lightweight network request gui built ontop of fetch</p>
				</div>
				<div className="border border-neutral-800 bg-neutral-950/25 px-4 py-2">
					<p className="font-bold">Is this complete?</p>
					<p>No, but you can still try to use it</p>
				</div>
				<div className="border border-neutral-800 bg-neutral-950/25 px-4 py-2">
					<p className="font-bold">Roadmap?</p>
					<ul>
						<li>error handling</li>
						<li>presets</li>
						<li>better validation</li>
						<li>syntax highlighting in response</li>
						<li>more payload types (x-www)</li>
						<li>refactor everything when done</li>
					</ul>
				</div>
				<div className="border border-neutral-800 bg-neutral-950/25 px-4 py-2">
					<p className="font-bold">Timeframe?</p>
					<p>No estimate, I work on it as a hobby</p>
				</div>
				<div className="border border-neutral-800 bg-neutral-950/25 px-4 py-2">
					<p className="font-bold">A11Y?</p>
					<p>If I end up using it a bunch, I will try to make it accessible</p>
				</div>
				<div className="border border-neutral-800 bg-neutral-950/25 px-4 py-2">
					<p className="font-bold">It did something weird</p>
					<p>Email me or open a github issue</p>
				</div>
			</div>
		</Accordion>
	)
}
