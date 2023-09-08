import { useState } from 'react';
import { Button } from '@/components/shadcn/ui/button';

export default function LuxortsDetails() {
	const [more, setShowMore] = useState(false);

	if (!more) {
		return (
			<>
				<ul>
					<li>
						Designed and built web applications for sales and business
						operations
					</li>
					<li>Enhanced UI/UX for customers</li>
					<li>Improved UI/UX for internal tools</li>
					<li>...</li>
				</ul>
				<br />
				<Button onClick={() => setShowMore(true)} variant="ghost">
					show more
				</Button>
			</>
		);
	}

	return (
		<>
			<ul>
				<li>
					Designed and built web applications for sales and business operations
				</li>
				<li>Enhanced UI/UX for customers</li>
				<li>Improved UI/UX for internal tools</li>

				<li>Facilitated customer payments via Stripe Payments API</li>
				<li>Reduced server loads by optimizing or rewriting legacy code</li>
				<li>Created and maintained Docker images</li>
				<li>
					Configured and automated unit tests, end to end tests, integration
					tests
				</li>
			</ul>
			<br />
			<Button onClick={() => setShowMore(false)} variant="ghost">
				show less
			</Button>
		</>
	);
}
