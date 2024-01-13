import { expect, test } from '@playwright/test'

test.describe('As a not logged in user', () => {
	test('when I refresh the page I can still see the login form', async ({
		page
	}) => {
		await page.goto('/login')

		await expect(page.getByTestId('loginForm')).toBeInViewport()
		await page.reload()
		await expect(page.getByTestId('loginForm')).toBeInViewport()
	})

	test('when manually changing url to "/" I am redirected back to "/login"', async ({
		page
	}) => {
		await page.goto('/login')
		await page.goto('/')

		await expect(page.getByTestId('loginForm')).toBeInViewport()
	})

	test('after submitting the login form I am redirected to "/" ', async ({
		page
	}) => {
		await page.goto('/login')

		await page.getByPlaceholder('Login').fill('qwerty')
		await page.getByPlaceholder('Password').fill('12345')

		await page.route('**/login', (route) => {
			route.fulfill({
				body: JSON.stringify({ accessToken: '1234567890' })
			})
		})

		await page.getByRole('button', { name: 'SIGN IN' }).click()

		await page.waitForURL('/')

		await expect(
			page.locator('_react=Card[data-testid = "main"]')
		).toBeInViewport()
	})
})

test.describe('As a logged in user', () => {
	test.beforeEach(async ({ page, browser }) => {
		await page.goto('/login')

		await page.getByPlaceholder('Login').fill('qwerty')
		await page.getByPlaceholder('Password').fill('12345')

		await page.route('**/login', (route) => {
			route.fulfill({
				body: JSON.stringify({ accessToken: '1234567890' })
			})
		})

		const browserContext = await browser.newContext()
		await browserContext.addCookies([
			{
				name: 'refreshToken',
				value: 'qwerty',
				httpOnly: true,
				path: '/',
				domain: 'localhost'
			}
		])

		await page.getByRole('button', { name: 'SIGN IN' }).click()
	})
	test('I can see "get data" button and "logout" button', async ({ page }) => {
		await expect(
			page.locator('_react=Card[data-testid = "main"]')
		).toBeInViewport()
	})

	test('I refresh the page I am still logged in and can see "get data" button and "logout" button', async ({
		page
	}) => {
		await expect(
			page.locator('_react=Card[data-testid = "main"]')
		).toBeInViewport()

		await page.route('**/refresh', (route) => {
			route.fulfill({
				body: JSON.stringify({ accessToken: '1234567890' })
			})
		})

		await page.reload()

		await expect(
			page.locator('_react=Card[data-testid = "main"]')
		).toBeInViewport()
	})

	test('I click "get data" button I can fetch protected data', async ({
		page
	}) => {
		await page.route('**/data', (route) => {
			route.fulfill({
				body: JSON.stringify({ message: 'Access granted' })
			})
		})

		await page.getByRole('button', { name: 'Get Data' }).click()
		await expect(
			page.getByRole('heading', { name: 'Access granted' })
		).toBeInViewport()
	})

	test('when the access token expires I can refresh the token and fetch protected data', async ({
		page
	}) => {
		await page.route('**/data', (route, request) => {
			if (request.headers()['authorization'] === 'Bearer 1234567890') {
				route.fulfill({
					status: 403
				})
			} else {
				route.fulfill({
					body: JSON.stringify({ message: 'Access granted' })
				})
			}
		})

		await page.route('**/refresh', (route) => {
			route.fulfill({
				body: JSON.stringify({ accessToken: '0987654321' })
			})
		})

		await page.getByRole('button', { name: 'Get Data' }).click()
		await expect(
			page.getByRole('heading', { name: 'Access granted' })
		).toBeInViewport()
	})

	test('when I click "Logout" button I am logged out and redirected to "/login"', async ({
		page
	}) => {
		await page.getByRole('button', { name: 'LOGOUT' }).click()

		await page.waitForURL('/login')
		await expect(page.getByTestId('loginForm')).toBeInViewport()
	})

	test('when the refresh token expires I am redirected to /login page', async ({
		page
	}) => {
		await page.route('**/data', (route) => {
			route.fulfill({
				status: 403
			})
		})

		await page.route('**/refresh', (route) => {
			route.fulfill({
				status: 401
			})
		})

		await page.getByRole('button', { name: 'Get Data' }).click()
		await page.waitForURL('/login')
		await expect(page.getByTestId('loginForm')).toBeInViewport()
	})
})
