/** @type {import('jest').Config} */
const config = {
	testEnvironment: 'jsdom',
	testRegex: '__tests__.*\\.spec.js$',
	collectCoverage: true,
	coverageReporters: ['text'],
}

module.exports = config
