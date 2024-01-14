export function script(url: string) {
	const script = document.createElement('script')
	script.src = url
	document.body.appendChild(script)
}
