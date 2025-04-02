import type { Config } from 'jest'

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/tests/**/*.test.ts'], // Only run tests inside the tests folder
	clearMocks: true,
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
}

export default config
