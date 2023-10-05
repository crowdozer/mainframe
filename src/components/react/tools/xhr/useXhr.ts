import { useCallback, useMemo, useState } from 'react'
import type { HttpMethod, Header, BodyType } from './types'

const isProd = import.meta.env.PROD
const defaultURL = isProd
	? 'https://www.crwdzr.io/tools/xhr-api'
	: 'http://localhost:4321/tools/xhr-api'

/**
 * Returns the editor page API
 */
export default function useXhr() {
	// Method & URL
	const [method, setMethod] = useState<HttpMethod>('GET')
	const [url, setUrl] = useState<string>(defaultURL)
	const [loading, setLoading] = useState(false)

	// Array of headers
	const [headers, setHeaders] = useState<Header[]>([
		{
			id: Math.random().toString(36),
			hasError: false,
			hasWarning: false,
			name: 'Content-Type',
			value: 'application/json',
		},
		{
			id: Math.random().toString(36),
			hasError: false,
			hasWarning: false,
			name: 'User-Agent',
			value: 'crwdzr.io/tools/xhr',
		},
	])

	// Adds certain flags (i.e hasError) to headers
	const parsedHeaders = useMemo(() => {
		return headers.map((header, index) => {
			return {
				id: header.id,
				name: header.name.trim(),
				value: header.value.trim(),
				hasError: checkForError(header, index),
				hasWarning: checkForWarning(header),
			} as Header
		})
	}, [headers])

	// Filter out blank/empty headers
	const filteredHeaders = useMemo(() => {
		return parsedHeaders.filter((header) => {
			return header.name !== '' && header.value !== ''
		})
	}, [parsedHeaders])

	// Body type (json, etc)
	const [body, setBody] = useState<string>('')
	const [bodyType, setBodyType] = useState<BodyType>('json')

	// Used to store the results of the requests
	const [responseRaw, setResponseRaw] = useState<Response | null>(null)
	const [response, setResponse] = useState<string>('')

	/**
	 * for json editor
	 */
	const onBodyChange = useCallback((val: any, viewUpdate: any) => {
		setBody(val)
	}, [])

	/**
	 * returns whether or not the given header has an error
	 */
	function checkForError(header: Header, index: number): boolean {
		// both empty is allowed
		if (header.name === '' && header.value === '') return false

		// data with no type is not allowed
		if (header.name === '' && header.value !== '') return true

		// duplicate types not allowed
		const typeCollision = headers.some(
			(h, i) => h.name === header.name && index !== i,
		)

		if (typeCollision) return true

		return false
	}

	/**
	 * returns whether or not the givne header has a warning
	 */
	function checkForWarning(header: Header): boolean {
		if (header.name !== '' && header.value === '') return true

		return false
	}

	/**
	 * Add a new blank entry for headers
	 */
	function handleAddHeader() {
		setHeaders((oldHeaders) => {
			return oldHeaders.concat({
				id: Math.random().toString(36),
				hasWarning: false,
				hasError: false,
				name: '',
				value: '',
			})
		})
	}

	/**
	 * Remove the header at the given index
	 */
	function handleRemoveHeader(index: number) {
		setHeaders((oldHeaders) => {
			return oldHeaders.filter((_, i) => i !== index)
		})
	}

	/**
	 * Update header name at the given index
	 */
	function handleUpdateHeaderType(index: number, value: string) {
		setHeaders((oldHeaders) => {
			const newHeaders = [...oldHeaders]
			newHeaders[index].name = value.trim()
			return newHeaders
		})
	}

	/**
	 * Update header content at the given index
	 */
	function handleUpdateHeaderContent(index: number, value: string) {
		setHeaders((oldHeaders) => {
			const newHeaders = [...oldHeaders]
			newHeaders[index].value = value
			return newHeaders
		})
	}

	/**
	 * Fire the request and push the response to state
	 */
	function handleSendRequest() {
		const options: RequestInit = {
			method,
			headers: filteredHeaders.map((header) => [header.name, header.value]),
		}

		if (method !== 'GET') {
			if (bodyType === 'json') {
				options.body = JSON.stringify(body)
			}
		}

		setLoading(true)
		setResponseRaw(null)
		setResponse('')

		fetch(url, options)
			.then(async (response) => {
				setResponseRaw(response)

				if (!response.ok) {
					throw new Error('Network response was not ok')
				}

				const contentType = response.headers.get('Content-Type')
				if (contentType && contentType.includes('application/json')) {
					// json response
					const json = await response.json()
					return JSON.stringify(json, null, 4)
				} else {
					// other types (text, html)
					return response.text()
				}
			})
			.then((data) => setResponse(data))
			.catch(console.error)
			.finally(() => setLoading(false))
	}

	return {
		body,
		bodyType,
		handleAddHeader,
		handleClick: handleSendRequest,
		handleRemoveHeader,
		handleUpdateHeaderContent,
		handleUpdateHeaderType,
		headers: parsedHeaders,
		loading,
		method,
		numActiveHeaders: filteredHeaders.length,
		onBodyChange,
		response,
		responseRaw,
		setBody,
		setBodyType,
		setMethod,
		setUrl,
		url,
	}
}
