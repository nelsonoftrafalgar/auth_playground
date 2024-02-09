import { expect, test } from 'next/experimental/testmode/playwright' // msw is also required
import jwt, { Secret } from 'jsonwebtoken'

const accessToken = jwt.sign(
	{ login: 'login' },
	process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET as Secret
)

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

			if (request.url === 'http://localhost:3000/api/auth/session') {
				return new Response(
					JSON.stringify({
						user: {},
						accessToken
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

			if (request.url === 'http://localhost:3000/api/auth/session') {
				return new Response(
					JSON.stringify({
						user: {},
						accessToken
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

	test('I refresh the page and I am still logged in and can see "get data" and "logout" button and data fetched on the server side', async ({
		page
	}) => {
		await page.reload()

		await expect(
			page.locator('_react=Card[data-testid = "main"]')
		).toBeInViewport()
		await expect(
			page.getByRole('heading', { name: 'Access granted' })
		).toBeInViewport()
	})

	test('I click "get data" button I can fetch protected data', async ({
		page
	}) => {
		await page.route('**/data', (route) => {
			route.fulfill({
				body: JSON.stringify({ message: 'Access granted client side' })
			})
		})

		await page.getByRole('button', { name: 'Get Data' }).click()
		await expect(
			page.getByRole('heading', { name: 'Access granted client side' })
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

		await page.getByRole('button', { name: 'Get Data' }).click()
		await page.waitForURL('/login')
		await expect(page.getByTestId('loginForm')).toBeInViewport()
	})
})
