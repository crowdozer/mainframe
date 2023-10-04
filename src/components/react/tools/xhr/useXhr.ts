import { useCallback, useState } from 'react'
import type { HttpMethod, Header, BodyType } from './types'

/**
 * Returns the editor page API
 */
export default function useXhr() {
	const [url, setUrl] = useState<string>('http://localhost:4321')
	const [method, setMethod] = useState<HttpMethod>('GET')
	const [headers, setHeaders] = useState<Header[]>([
		['Content-Type', 'application/json'],
		['', ''],
	])
	const [body, setBody] = useState<string>('')
	const [bodyType, setBodyType] = useState<BodyType>('json')

	const onBodyChange = useCallback((val: any, viewUpdate: any) => {
		setBody(val)
	}, [])

	function handleAddHeader() {
		setHeaders((oldHeaders) => {
			return [...oldHeaders, ['', '']]
		})
	}

	function handleClick() {
		console.log('clicked')

		fetch(url, {
			method,
		})
			.then(console.log)
			.catch(console.error)
	}

	return {
		url,
		setUrl,
		method,
		setMethod,
		headers,
		setHeaders,
		body,
		setBody,
		bodyType,
		setBodyType,
		handleAddHeader,
		handleClick,
		onBodyChange,
	}
}
