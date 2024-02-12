import { defineConfig, devices } from 'next/experimental/testmode/playwright'

import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	preserveOutput: 'never',
	use: {
		baseURL: 'http://localhost:3000',
		trace: 'on-first-retry'
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] }
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] }
		}
	],

	webServer: {
		command: 'yarn dev --experimental-test-proxy',
		url: 'http://localhost:3000',
		reuseExistingServer: !process.env.CI
	}
})
