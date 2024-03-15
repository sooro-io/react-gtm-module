import Snippets from '../Snippets'

let args
let snippets

describe('Snippets', () => {
	beforeEach(() => {
		args = {
			id: 'GTM-xxxxxx',
			dataLayerName: 'dataLayer',
			events: {},
			source: 'https://googletagmanager.com/gtm.js',
		}
		snippets = Snippets.tags(args)
	})

	it('should use the `id` for the iframe', () => {
		expect(snippets.iframe).toContain(`id=${args.id}`, 1)
	})

	it('should use the `gtm_auth` and `gtm_preview` for the iframe', () => {
		Object.assign(args, {
			auth: '6sBOnZx1hqPcO01xPOytLK',
			preview: 'env-2',
		})
		snippets = Snippets.tags(args)
		expect(snippets.iframe).toContain(`gtm_auth=${args.auth}`, 1)
		expect(snippets.iframe).toContain(`gtm_preview=${args.preview}`, 1)
	})

	it('should use the `dataLayer` for the script', () => {
		args = { dataLayer: { name: 'test' } }
		snippets = Snippets.dataLayer(args)
		expect(snippets).toContain('{"name":"test"}')
	})

	it('should use the `dataLayerName` for the script', () => {
		args = { dataLayerName: 'customName' }
		snippets = Snippets.dataLayer(args)
		expect(snippets).toContain('customName')
	})

	it('no id provided should log a warn', () => {
		console.warn = jest.fn()
		const noIdArgs = {
			dataLayerName: 'dataLayer',
			events: {},
			source: 'https://googletagmanager.com/gtm.js',
		}
		Snippets.tags(noIdArgs)
		expect(console.warn).toBeCalled()
	})

	it('should use the nonce for the script', () => {
		const nonce = 'pKFLb6zigj6vHak2TVeKx'
		Object.assign(args, { nonce })
		snippets = Snippets.tags(args)
		expect(snippets.script).toContain(`setAttribute('nonce','${nonce}')`, 1)
	})

	it('should use the source URL in iframe', () => {
		const source = 'https://tracking.example.com/gtm.js'
		const url = new URL(source)
		Object.assign(args, { source })
		snippets = Snippets.tags(args)
		expect(snippets.iframe).toContain(`src="${url.origin}/ns.html`)
	})

	it('should use the source URL in script', () => {
		const source = 'https://tracking.example.com/gtm.js'
		Object.assign(args, { source })
		snippets = Snippets.tags(args)
		expect(snippets.script).toContain(`src='${source}?id=`)
	})

	it('should use the events in the script', () => {
		const events = [{ event: 'test', value: 100 }]
		Object.assign(args, { events })
		snippets = Snippets.tags(args)
		expect(snippets.script).toContain(JSON.stringify(events).slice(1, -1))
	})
})
