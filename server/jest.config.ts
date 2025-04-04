import type { Config } from 'jest'

const config: Config = {
	preset: 'ts-jest/presets/default-esm', // Use ESM preset for TypeScript
	testEnvironment: 'node',
	testMatch: ['**/tests/**/*.test.ts'], // Only run tests inside the tests folder
	clearMocks: true,
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1', // Map @/ to the root directory
	},
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				useESM: true, // Enable ESM support in ts-jest
			},
		],
	},
	transformIgnorePatterns: [
		'/node_modules/', // Ignore transformations for node_modules
	],
}

export default config
