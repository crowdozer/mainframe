---
layout: '@/layouts/Blog.astro'
title: Reducing component complexity with React Hooks
author: crowdozer
description: We'll talk about using React hooks to reduce component complexity, with a few brief examples
date: '2020-11-10'
---

Hooks may seem mysterious, but in React, hook is just a function prefixed with `use`, and it's allowed to execute other hooks.<sup>1</sup> Within reason, you can a hook for anything: network requests, state management, redirecting the user, etc.

Let's look at a clever way to use Hooks for component abstraction. 👍

### The scenario

Imagine you have a Newsfeed component. It loads and renders posts from your api. The simplest implementation is to inline everything, at the top of your component:

```js
// Newsfeed.jsx

import React, { useState } from 'react';

export const Newsfeed = () => {
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState([]);

	const getPosts = () => {
		setLoading(true);
		fetch('/v1/posts')
			.then((data) => data.json())
			.then((data) => setPosts(data))
			.then(() => setLoading(false));
	};

	return (
		<div>
			{posts.map((post, index) => (
				<div key={index}>
					<h1>{post.title}</h1>
				</div>
			))}
			{loading ? (
				<p>Loading...</p>
			) : (
				<button onClick={getPosts}>Load Posts</button>
			)}
		</div>
	);
};
```

### The problem

It's a great start, and inlining is a fantastic way to prototype quickly - but it often isn't enough. If we're going to build a useful app, we're going to end up with a buttload of complexity in our component.

For example, we might add:

- `loading` to track the network request
- `posts` to hold the result
- `page` to track what page of posts the user is on (useful for infinite scroll)
- `open` to track if an individual post is open or closed
- `replying` to track if the user is replying to the post

Not to mention the functions we'll need:

- `getPosts`
- `getPost`
- `getPostComments`
- `submitComment`
- you get the idea.

That's _a lot_ of complexity to add to the top of a functional component. We haven't even considered how the render portion of that component will grow, too.

Sometimes you can break one complex component into many smaller components, but you can't always cleanly separate the logic, and it doesn't always make sense to use a library like Redux for _one_ component.

### The solution

Just don't include the complexity in the component. Throw it into a hook.

Why a hook?

Because it's really easy. No reducers or contexts.

The key concept is that our hook will _return_ everything required for the component to render. Think of it like this... the hook is providing you with a second set of props, props that describe how the UI should behave.<sup>2</sup>

Let's see what it looks like after we import the hook, <kbd>ctrl</kbd>+<kbd>x</kbd> and <kbd>ctrl</kbd>+<kbd>v</kbd> all of the logic away.

```js
// Newsfeed.jsx

import React from 'react';
import { useNewsfeed } from './useNewsfeed';

export const Newsfeed = () => {
	// Destructure the value that the hook returns
	const {
		state: { loading, posts },
		getPosts,
	} = useNewsfeed();

	return (
		<div>
			{posts.map((post, index) => (
				<div key={index}>
					<h1>{post.title}</h1>
				</div>
			))}
			{loading ? (
				<p>Loading...</p>
			) : (
				<button onClick={getPosts}>Load Posts</button>
			)}
		</div>
	);
};
```

```js
// useNewsfeed.js

import { useState } from 'react';

export const useNewsfeed = () => {
	// Our hook manages our state for us
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState([]);

	// It also manages our functionality
	const getPosts = () => {
		setLoading(true);
		fetch('/v1/posts')
			.then((data) => data.json())
			.then((data) => setPosts(data))
			.then(() => setLoading(false));
	};

	// Finally, it exposes only what is required by the component
	return {
		state: { loading, posts },
		getPosts,
	};
};
```

### When should you do this?

The answer is... it depends. It's like asking "should I inline this style, or use a stylesheet?" ...there are valid situations for both.

Here are some benefits to consider:

1. It separates concerns, without adding much complexity.<sup>3</sup>

2. Cleans up imports. You don't have component library imports mixed with your network request/state management imports.

3. Legibility. It's easier to quickly digest code when you aren't parsing "is this for GUI or API?"

4. Consolidates logic, which makes locating, understanding, and altering it easier.

5. Seamless integration. No need to refactor anything.

6. Mockability. Our hook could look like this and our component would be none the wiser:

```js
// useNewsfeed.js

// Always returns this value, faking the UI state.
// This makes debugging a component really, really easy.
export const useNewsfeed = () => {
	return {
		state: {
			loading: false,
			posts: [
				{
					id: 6,
					title: 'Hooks are cool',
				},
			],
		},
		getPosts: () => null,
	};
};
```

### Caveats

Familiarize yourself with how hook dependencies work. For example, if you don't properly use things like `useCallback` and `useMemo`, you can easily up with unnecessary rerenders and it'll kill your performance. 😅

If you haven't, I recommend you download an extension that warns you when you're using deps incorrectly, they help a lot.

### 🧠 What do you think?

Do you already use hooks like this?

Do you hate the idea of this?

Do you take it further and create tons of custom hooks?

Lemme know 👋

---

<small>

<sup>1</sup> https://reactjs.org/docs/hooks-custom.html#extracting-a-custom-hook

<sup>2</sup> Similarly, but not exactly the same. Remember, unlike props, React is choosing when to rerender everything based on certain things happening under the hood - like the value of `useState` or a dependency passed to `useCallback` changing.

<sup>3</sup> With a simple example like our Newsfeed app that only has two states and one function, it probably isn't worth the complexity this adds. It's up to you to decide what's right. Always ask yourself: "Can I quickly develop and maintain a mental model of this?"
</small>
