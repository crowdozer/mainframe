import { useState } from 'react'
import { Button } from '@/components/react/ui'

export default function LuxortsDetails() {
	const [more, setShowMore] = useState(false)

	return (
		<ul>
			<li>
				Launched the Luxorts web app, to provide direct market of Luxury Condos
			</li>
			<li style={{ listStyle: 'none' }}>
				<ul>
					<li>
						<a
							href="https://www.luxorts.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							www.luxorts.com
						</a>
					</li>
				</ul>
			</li>
			<li>
				Built and maintained in-house CMS systems with customized CRUD
				workflows, wizards, tooling, and API integrations (CiiRUS, Stripe,
				MailChimp)
			</li>
			<li>
				Implemented dashboards, reports, and datatables to provide data insights
			</li>
			<li>
				Integrated a secure Leads API to digest, sanitize, and distribute new
				call center leads from both internal and external sources
			</li>
			<li>
				Created internal tooling to automate repetitive tasks, reducing data
				entry labor
			</li>
			{more && (
				<>
					<li>
						Collaborated with leadership to identify software requirements
					</li>
					<li>Automated testing (PHPUnit + Jest)</li>
					<li>
						Optimized and refactored legacy servers or prototypes when necessary
					</li>
					<li>
						Created and maintained Docker images to provide consistency and
						reproducibility
					</li>
					<li>Created and maintained the various Github repos</li>
					<li>Assisted in various hardware related problems</li>
					<li style={{ listStyle: 'none', marginTop: '1rem' }}>
						<Button onClick={() => setShowMore(false)}>show less</Button>
					</li>
				</>
			)}
			{!more && (
				<>
					<li>...</li>
					<li style={{ listStyle: 'none', marginTop: '1rem' }}>
						<Button onClick={() => setShowMore(true)}>show more</Button>
					</li>
				</>
			)}
		</ul>
	)
}
