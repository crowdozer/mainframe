export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS'
export type BodyType = 'json' | 'other'
export type Header = {
	name: string
	value: string
	hasError: boolean
	hasWarning: boolean
	id: string
}
