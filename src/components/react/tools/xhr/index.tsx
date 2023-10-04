import clsx from 'clsx'
import { json } from '@codemirror/lang-json'
import { monokai } from '@uiw/codemirror-theme-monokai'
import CodeMirror from '@uiw/react-codemirror'
import FAQ from './FAQ'
import Headers from './Headers'
import useXhr from './useXhr'
import type { HttpMethod } from './types'

export default function Bostman() {
	const {
		body,
		bodyType,
		handleAddHeader,
		handleClick,
		headers,
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
				<h1 className="text-4xl">Bostman</h1>
				<hr />
			</div>
			<div>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					{/* Config area */}
					<div className="flex flex-col gap-4">
						<p className="px-2 py-1 font-bold">request</p>

						{/* url */}
						<div className="-mt-3 overflow-x-auto lg:overflow-x-hidden">
							<div className="flex flex-row gap-1">
								<select
									className="border border-neutral-700 bg-transparent px-2 py-1"
									value={method}
									onChange={(e) => setMethod(e.target.value as HttpMethod)}
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
								</select>
								<input
									className="grow border border-neutral-700 bg-transparent px-2 py-1"
									value={url}
									onChange={(e) => setUrl(e.target.value)}
								/>
							</div>
						</div>

						{/* headers */}
						<div className="w-full overflow-x-auto lg:overflow-x-hidden">
							<Headers
								handleAddHeader={handleAddHeader}
								numActiveHeaders={numActiveHeaders}
								headers={headers}
								setHeaders={setHeaders}
							/>
						</div>

						{/* body */}
						<div className="flex flex-col gap-1">
							{method === 'GET' && (
								<p className="border border-transparent border-l-yellow-500 bg-neutral-800 px-2 py-1 text-sm font-thin">
									body unavailable with GET requests
								</p>
							)}
							{method !== 'GET' && (
								<>
									<div className="flex flex-col gap-1">
										<div className="flex flex-row gap-1">
											<button
												className={clsx(
													'border border-neutral-700 px-2 py-1 hover:bg-neutral-800',
													{
														'bg-neutral-800': bodyType === 'json',
													},
												)}
												onClick={() => setBodyType('json')}
											>
												json body
											</button>
											<button
												className={clsx(
													'border border-neutral-700 px-2 py-1 hover:bg-neutral-800',
													{
														'bg-neutral-800': bodyType === 'other',
													},
												)}
												onClick={() => setBodyType('other')}
											>
												plaintext body
											</button>
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
											className="min-h-full w-full whitespace-pre border border-neutral-700 bg-transparent px-2 py-1 font-mono"
											value={body}
											onChange={(e) => setBody(e.target.value)}
										/>
									)}
								</>
							)}
						</div>

						{/* send button */}
						<div className="text-right">
							<button
								className="border border-neutral-700 px-2 py-1 hover:bg-neutral-800"
								onClick={handleClick}
							>
								send 🚀
							</button>
						</div>
					</div>

					{/* Response area */}
					<div className="flex flex-col gap-1">
						<div className="flex flex-row gap-4 px-2 py-1">
							<p className="font-bold">response</p>
							<div className="grow"></div>
							{responseRaw && (
								<p
									className={clsx(
										'rounded-full px-3',
										getResponseColor(responseRaw.status),
									)}
								>
									{responseRaw.status} {responseRaw.statusText}
								</p>
							)}
						</div>
						<pre className="h-[400px] resize-y overflow-auto border border-neutral-700 p-2">
							{response}
						</pre>
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

function getResponseColor(status: number) {
	if (status >= 200 && status < 300) {
		return 'bg-green-500/30'
	}
	if (status >= 300 && status < 400) {
		return 'bg-yellow-500/30'
	}
	return 'bg-red-500/30'
}
