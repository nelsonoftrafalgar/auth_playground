import { expect, test } from 'next/experimental/testmode/playwright' // msw is also required

const accessToken = 'accessToken'

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
		page,
		next
	}) => {
		await page.context().addCookies([
			{
				name: 'accessToken',
				value: 'accessToken',
				domain: 'localhost',
				path: '/'
			}
		])

		next.onFetch((request) => {
			if (request.url === 'http://localhost:8000/data') {
				return new Response(
					JSON.stringify({
						message: 'Access granted'
					}),
					{
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
			}
			return 'abort'
		})

		await page.goto('/login')

		await page.getByPlaceholder('Login').fill('qwerty')
		await page.getByPlaceholder('Password').fill('12345')

		await page.route('**/login', (route) => {
			route.fulfill({
				body: JSON.stringify({ accessToken })
			})
		})

		await page.getByRole('button', { name: 'SIGN IN' }).click()

		await page.waitForURL('/')

		await expect(
			page.locator('_react=Card[data-testid = "main"]')
		).toBeInViewport()
		await expect(
			page.getByRole('heading', { name: 'Access granted' })
		).toBeInViewport()
	})
})

test.describe('As a logged in user', () => {
	test.beforeEach(async ({ page, next }) => {
		await page.context().addCookies([
			{
				name: 'accessToken',
				value: 'accessToken',
				domain: 'localhost',
				path: '/'
			}
		])

		next.onFetch((request) => {
			if (request.url === 'http://localhost:8000/data') {
				return new Response(
					JSON.stringify({
						message: 'Access granted'
					}),
					{
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
			}
			return 'abort'
		})

		await page.goto('/login')

		await page.getByPlaceholder('Login').fill('qwerty')
		await page.getByPlaceholder('Password').fill('12345')

		await page.route('**/login', (route) => {
			route.fulfill({
				body: JSON.stringify({ accessToken })
			})
		})

		await page.getByRole('button', { name: 'SIGN IN' }).click()

		await page.waitForURL('/')

		await expect(
			page.locator('_react=Card[data-testid = "main"]')
		).toBeInViewport()
	})
	test('I can see "get data" and "logout" button and data fetched on the server side', async ({
		page
	}) => {
		await expect(
			page.getByRole('heading', { name: 'Access granted' })
		).toBeInViewport()
	})

	test('I refresh the page I am still logged in and can see "get data" and "logout" button and data fetched on the server side', async ({
		page
	}) => {
		await page.route('**/refresh', (route) => {
			route.fulfill({
				body: JSON.stringify({ accessToken })
			})
		})

		await page.reload()

		await expect(
			page.locator('_react=Card[data-testid = "main"]')
		).toBeInViewport()
		await expect(
			page.getByRole('heading', { name: 'Access granted' })
		).toBeInViewport()
	})

	test('I click "get data" button I can fetch protected data', async ({
		page,
		next
	}) => {
		next.onFetch((request) => {
			if (request.url === 'http://localhost:8000/data') {
				return new Response(
					JSON.stringify({
						message: 'Access granted client side'
					}),
					{
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
			}
			return 'abort'
		})

		await page.getByRole('button', { name: 'Get Data' }).click()
		await expect(
			page.getByRole('heading', { name: 'Access granted client side' })
		).toBeInViewport()
	})

	test('when the access token expires I can refresh the token and fetch protected data', async ({
		page,
		next
	}) => {
		next.onFetch((request) => {
			if (request.url === 'http://localhost:8000/data') {
				if (request.headers.get('authorization') === `Bearer ${accessToken}`) {
					return new Response('error', { status: 403 })
				} else {
					return new Response(
						JSON.stringify({
							message: 'After refresh access granted'
						}),
						{ status: 200 }
					)
				}
			}

			if (request.url === 'http://localhost:8000/refresh') {
				return new Response(
					JSON.stringify({
						accessToken: '0987654321'
					}),
					{ status: 200 }
				)
			}

			return 'abort'
		})

		await page.getByRole('button', { name: 'Get Data' }).click()
		await expect(
			page.getByRole('heading', { name: 'After refresh access granted' })
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
		page,
		next
	}) => {
		next.onFetch((request) => {
			if (request.url === 'http://localhost:8000/data') {
				return new Response('error', { status: 403 })
			}

			if (request.url === 'http://localhost:8000/refresh') {
				return new Response('error', { status: 401 })
			}

			return 'abort'
		})
		// await page.route('**/data', (route) => {
		// 	route.fulfill({
		// 		status: 403
		// 	})
		// })

		// await page.route('**/refreshToken', (route) => {
		// 	route.fulfill({
		// 		status: 401
		// 	})
		// })

		await page.getByRole('button', { name: 'Get Data' }).click()
		await page.waitForURL('/login')
		await expect(page.getByTestId('loginForm')).toBeInViewport()
	})
})
