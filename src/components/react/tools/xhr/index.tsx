import { json } from '@codemirror/lang-json'
import CodeMirror from '@uiw/react-codemirror'
import { monokai } from '@uiw/codemirror-theme-monokai'
import Headers from './Headers'
import type { HttpMethod } from './types'
import useXhr from './useXhr'
import clsx from 'clsx'

export default function Bostman() {
	const {
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
	} = useXhr()

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				{/* url */}
				<div className="px-4 py-3">
					<div className="flex flex-col gap-1 ">
						<label htmlFor="xhr-url" className="font-bold">
							url
						</label>
						<div className="flex flex-row gap-1">
							<select
								className="border border-neutral-700 bg-transparent px-2 py-1"
								id="xhr-method"
								value={method}
								onChange={(e) => setMethod(e.target.value as HttpMethod)}
							>
								<option value="GET">GET</option>
								<option value="POST">POST</option>
								<option value="PUT">PUT</option>
								<option value="DELETE">DELETE</option>
							</select>
							<input
								className="grow border border-neutral-700 bg-transparent px-2 py-1"
								value={url}
								id="xhr-url"
								onChange={(e) => setUrl(e.target.value)}
							/>
						</div>
					</div>
				</div>

				{/* headers */}
				<div className="px-2">
					<Headers
						handleAddHeader={handleAddHeader}
						headers={headers}
						setHeaders={setHeaders}
					/>
				</div>

				{/* body */}
				<div className="flex flex-col gap-1 px-4 py-3">
					<div className="flex flex-col gap-1">
						<p className="font-bold">body</p>
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
								json
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
								other
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
							className="min-h-[140px] w-full whitespace-pre border border-neutral-700 bg-transparent px-2 py-1 font-mono"
							value={body}
							onChange={(e) => setBody(e.target.value)}
						/>
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
		</div>
	)
}
