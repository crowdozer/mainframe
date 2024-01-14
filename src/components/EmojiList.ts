export default function connect(id: string, emoji: string) {
	// we can't target these easily with the tools astro provides
	// so hack in some custom css scoped to this component
	const items = document.querySelectorAll(`#${id} ul li`)

	console.log(items)

	items.forEach((item) => {
		item.classList.add(`emoji-list-${id}-li`)
	})

	var styleElem = document.head.appendChild(document.createElement('style'))
	styleElem.innerHTML = `
        ul#${id} li::before {
            content: "${emoji}";
            margin-right: 0.5rem;
        }
    `
}
