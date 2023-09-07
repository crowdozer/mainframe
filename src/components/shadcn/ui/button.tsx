import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/shadcn-utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300',
	{
		variants: {
			variant: {
				default:
					'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:bg-zinc-300',

				dark: 'text-zinc-50 border bg-neutral-900 border-zinc-700 hover:border-zinc-300',

				primary:
					'border border-green-600 text-green-500 font-bold hover:bg-green-950 active:border-green-700 active:text-green-600',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-14 rounded-md px-8 text-xl',
				xl: 'h-16 rounded-md px-12 text-2xl',
				icon: 'h-10 w-10',
			},
			fullwidth: {
				true: 'w-full text-center',
				false: '',
			},
		},

		defaultVariants: {
			variant: 'default',
			size: 'default',
			fullwidth: false,
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, fullwidth, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, fullwidth, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
