import TagManager from '../TagManager'

describe('TagManager', () => {
	it('should render tagmanager', () => {
		TagManager.initialize({ gtmId: 'GTM-xxxxxx' })
		expect(window.dataLayer).toHaveLength(1)
	})

	it('should render datalayer', () => {
		const dataLayer = {
			userInfo: 'userInfo',
		}
		const gtmArgs = {
			gtmId: 'GTM-xxxxxx',
			dataLayer,
		}
		TagManager.initialize(gtmArgs)
		expect(window.dataLayer[1]).toEqual(dataLayer)
	})

	it('should render nonce', () => {
		TagManager.initialize({ gtmId: 'GTM-xxxxxx', nonce: 'foo' })
		const scripts = window.document.getElementsByTagName('script')
		expect(scripts[0].nonce).toBe('foo')
	})

	it('should use custom dataLayer name', () => {
		const dataLayerName = 'customName'
		TagManager.initialize({ gtmId: 'GTM-xxxxxx', dataLayerName })
		expect(window[dataLayerName]).not.toBeUndefined()
		expect(window[dataLayerName]).toHaveLength(1)
	})

	it('should add an event to dataLayer', () => {
		window['dataLayer'] = undefined
		TagManager.initialize({ gtmId: 'GTM-xxxxxx' })
		TagManager.dataLayer({ dataLayer: { event: 'test' } })
		expect(window['dataLayer']).toHaveLength(2)
	})

	it('should create non-existing dataLayer', () => {
		window['dataLayer'] = undefined
		TagManager.dataLayer({ dataLayer: { event: 'test' } })
		expect(window['dataLayer']).not.toBeUndefined()
		expect(window['dataLayer']).toHaveLength(1)
	})
})
