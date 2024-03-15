import warn from '../utils/warn'

describe('warn()', function () {
	it('should append [react-gtm-module] to warning messages', () => {
		global.console = { warn: jest.fn() }
		warn('foo')
		expect(console.warn).toHaveBeenCalledWith('[react-gtm-module]', 'foo')
	})
})
