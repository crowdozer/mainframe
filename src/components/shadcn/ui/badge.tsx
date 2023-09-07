import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/shadcn-utils';

const badgeVariants = cva(
	'text-zinc-50 select-none inline-flex items-center rounded-full border border-neutral-700 px-2.5 py-0.5 text-xs font-semibold transition-colors',
	{
		variants: {
			variant: {
				default: '',
			},
			chipcolor: {
				default: 'bg-neutral-700 hover:bg-neutral-800',
				red: 'text-zinc-100 bg-red-950 border-red-700 hover:bg-red-900',
				green: 'text-zinc-100 bg-green-950 border-green-700 hover:bg-green-900',
				blue: 'text-zinc-100 bg-blue-950 border-blue-700 hover:bg-blue-900',
			},
		},
		defaultVariants: {
			variant: 'default',
			chipcolor: 'default',
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, chipcolor, variant, ...props }: BadgeProps) {
	return (
		<div
			className={cn(badgeVariants({ variant, chipcolor }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
