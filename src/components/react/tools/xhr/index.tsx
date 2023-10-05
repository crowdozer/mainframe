import clsx from 'clsx'
import { json } from '@codemirror/lang-json'
import { monokai } from '@uiw/codemirror-theme-monokai'
import CodeMirror from '@uiw/react-codemirror'
import {
	Accordion,
	Button,
	Chip,
	Code,
	Input,
	Message,
	Select,
} from '@/components/react/ui'
import FAQ from './FAQ'
import Header from './Header'
import useXhr from './useXhr'
import type { HttpMethod } from './types'

export default function Bostman() {
	const {
		body,
		bodyType,
		handleAddHeader,
		handleClick,
		headers,
		loading,
		method,
		numActiveHeaders,
		onBodyChange,
		response,
		responseRaw,
		setBody,
		setBodyType,
		setHeaders,
		setMethod,
		setUrl,
		url,
	} = useXhr()

	return (
		<div className="mx-auto max-w-4xl space-y-8 px-2 py-8 lg:px-0">
			<div>
				<h1 className="text-4xl">network requests</h1>
				<hr />
			</div>
			<div>
				<div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-4">
					{/* Config area */}
					<div className="flex flex-col gap-4">
						<p className="px-2 py-1 font-bold">request</p>

						{/* url */}
						<div className="-mt-3 overflow-x-auto lg:overflow-x-hidden">
							<div className="flex flex-row gap-1">
								<Select
									name="Method"
									value={method}
									onChange={(value) => setMethod(value as HttpMethod)}
									disabled={loading}
								>
									<option className="text-neutral-950" value="GET">
										GET
									</option>
									<option className="text-neutral-950" value="POST">
										POST
									</option>
									<option className="text-neutral-950" value="PUT">
										PUT
									</option>
									<option className="text-neutral-950" value="PATCH">
										PATCH
									</option>
									<option className="text-neutral-950" value="DELETE">
										DELETE
									</option>
									<option className="text-neutral-950" value="OPTIONS">
										OPTIONS
									</option>
								</Select>
								<Input
									classes={{
										input: 'grow',
									}}
									name="url"
									value={url}
									onChange={(value) => setUrl(value)}
									disabled={loading}
								/>
							</div>
						</div>

						{/* headers */}
						<div className="w-full overflow-x-auto lg:overflow-x-hidden">
							<Accordion defaultOpen label={`headers (${numActiveHeaders})`}>
								{headers.map((header, index) => (
									<div
										className="flex flex-row gap-1 border border-transparent"
										key={index}
									>
										<Header
											loading={loading}
											headers={headers}
											header={header}
											index={index}
											setHeaders={setHeaders}
										/>
									</div>
								))}

								<Button disabled={loading} onClick={handleAddHeader}>
									+ new
								</Button>
							</Accordion>
						</div>

						{/* body */}
						<div className="flex flex-col gap-1">
							{method === 'GET' && (
								<Message kind="warning">
									body unavailable for GET requests
								</Message>
							)}
							{method !== 'GET' && (
								<>
									<div className="flex flex-col gap-1">
										<div className="flex flex-row gap-1">
											<Button
												onClick={() => setBodyType('json')}
												classes={{
													button: clsx({
														'bg-neutral-800': bodyType === 'json',
													}),
												}}
											>
												json body
											</Button>
											<Button
												onClick={() => setBodyType('other')}
												classes={{
													button: clsx({
														'bg-neutral-800': bodyType === 'other',
													}),
												}}
											>
												plaintext body
											</Button>
										</div>
									</div>

									{bodyType === 'json' && (
										<div className="border border-neutral-700">
											<CodeMirror
												value={body}
												height="200px"
												extensions={[json()]}
												theme={monokai}
												onChange={onBodyChange}
											/>
										</div>
									)}
									{bodyType === 'other' && (
										<textarea
											className="w-full grow whitespace-pre border border-neutral-700 bg-transparent px-2 py-1 font-mono"
											value={body}
											cols={4}
											onChange={(e) => setBody(e.target.value)}
										/>
									)}
								</>
							)}
						</div>

						{/* send button */}
						<div className="text-right">
							<Button
								onClick={handleClick}
								loading={loading}
								disabled={loading}
							>
								send 🚀
							</Button>
						</div>
					</div>

					{/* Response area */}
					<div className="flex flex-col gap-1">
						<div className="flex flex-row gap-4 px-2 py-1">
							<p className="font-bold">response</p>
							<div className="grow"></div>
							{responseRaw && (
								<Chip kind={getResponseKind(responseRaw.status)}>
									{responseRaw.status} {responseRaw.statusText}
								</Chip>
							)}
						</div>
						<Code content={response} />
					</div>
				</div>
			</div>

			{/* FAQ section/footer */}
			<div>
				<hr />
				<div className="mt-2">
					<FAQ />
				</div>
			</div>
		</div>
	)
}

function getResponseKind(status: number) {
	if (status >= 200 && status < 300) {
		return 'success'
	}
	if (status >= 300 && status < 400) {
		return 'warning'
	}
	return 'error'
}
