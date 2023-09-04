import { useState } from 'react';
import { Button } from '../shadcn/ui/button';

export default function Counter() {
	const [count, setCount] = useState(0);

	function handleClick() {
		setCount(count + 1);
	}

	return (
		<Button onClick={handleClick} variant="secondary">
			{count === 0 ? 'Click me' : `You clicked me ${count} times`}
		</Button>
	);
}
