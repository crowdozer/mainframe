import clsx from 'clsx';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/shadcn/ui/tooltip';

export interface TechSVGProps {
	// path to svg
	path: string;
	// title displayed on hover
	title: string;
	// whether or not to invert svg color
	invert?: boolean;
	// whether or not to de-invert on hover
	revert?: boolean;
	// whether or not to re-color on hover
	colorize?: boolean;
}

export function TechSVG(props: TechSVGProps) {
	const {
		path,
		title,
		invert = true,
		revert = false,
		colorize = false,
	} = props;

	return (
		<TooltipProvider delayDuration={300}>
			<Tooltip>
				<TooltipTrigger name={'show popover'}>
					<div className="p-2 transition-colors duration-200 ease-in-out hover:bg-neutral-800">
						<img
							src={path}
							width="42px"
							height="42px"
							className={clsx('grayscale', {
								invert: invert,
								'hover:grayscale-0': colorize,
								'hover:invert-0': revert,
							})}
							alt={title + ' icon'}
						/>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>{title}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
