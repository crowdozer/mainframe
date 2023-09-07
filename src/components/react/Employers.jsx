import { useState } from 'react';
import { Button } from '../shadcn/ui/button';

export default function Employers() {
	const [more, setShowMore] = useState(false);

	return (
		<div className="flex flex-col gap-4">
			<div className="border-l border-neutral-600 p-4">
				<div className="flex flex-row gap-4">
					<h2 className="text-lg">Luxorts</h2>
					<div className="grow"></div>
				</div>

				<h2 className="text-sm">
					Full Stack Developer <span className="text-xs">(2016 - 2022)</span>
				</h2>

				<div className="pl-4 pt-2">
					<ul>
						<li>
							- Designed and built web applications for sales and business
							operations
						</li>
						<li>- Enhanced UI/UX for customers</li>
						<li>- Improved UI/UX for internal tools</li>
						{!more ? (
							<>
								<li>- ...</li>
								<br />
								<Button onClick={() => setShowMore(true)} variant="outline">
									{' '}
									show 4 more
								</Button>
							</>
						) : (
							<>
								<li>- Facilitated customer payments via Stripe Payments API</li>
								<li>
									- Reduced server loads by optimizing or rewriting legacy code
								</li>
								<li>- Created and maintained Docker images</li>
								<li>
									- Configured and automated unit tests, end to end tests,
									integration tests
								</li>
								<br />
								<Button onClick={() => setShowMore(false)} variant="outline">
									show less
								</Button>
							</>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}
