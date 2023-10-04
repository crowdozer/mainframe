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

	// Array of headers
	const [headers, setHeaders] = useState<Header[]>([
		['Content-Type', 'application/json'],
		['User-Agent', 'bostman'],
		['', ''],
	])
	// Filter out blank/empty headers
	const filteredHeaders = useMemo(() => {
		return headers
			.map((header) => {
				return [header[0].trim(), header[1].trim()] as Header
			})
			.filter((header) => {
				return header[0] !== '' && header[1] !== ''
			})
	}, [headers])

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
	 * Add a new blank entry for headers
	 */
	function handleAddHeader() {
		setHeaders((oldHeaders) => {
			return [...oldHeaders, ['', '']]
		})
	}

	/**
	 * Fire the request and push the response to state
	 */
	function handleSendRequest() {
		const options: RequestInit = {
			method,
			headers: filteredHeaders,
		}

		if (method !== 'GET') {
			if (bodyType === 'json') {
				options.body = JSON.stringify(body)
			}
		}

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
	}

	return {
		body,
		bodyType,
		handleAddHeader,
		handleClick: handleSendRequest,
		headers,
		method,
		numActiveHeaders: filteredHeaders.length,
		onBodyChange,
		response,
		responseRaw,
		setBody,
		setBodyType,
		setHeaders,
		setMethod,
		setUrl,
		url,
	}
}
