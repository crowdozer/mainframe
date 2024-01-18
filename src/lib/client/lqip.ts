function init() {
	const images = document.getElementsByTagName('img')

	for (let i = 0; i < images.length; i++) {
		const image = images[i]
		const src = image.getAttribute('data-defer')
		if (!src) continue
		image.setAttribute('src', src)
	}
}

init()
