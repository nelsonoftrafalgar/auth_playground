import client from '@/http/client'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
	const credentials = await req.json()

	try {
		const { data, headers } = await client.post('/login', {
			data: credentials
		})

		const cookieStore = cookies()
		cookieStore.set('accessToken', data.accessToken)
		cookieStore.set('refreshToken', headers['set-cookie']?.[0]!, {
			httpOnly: true,
			maxAge: 15
		})

		return new Response('OK', {
			status: 200
		})
	} catch (error) {
		console.log('login handler error')
		return new Response('Error', { status: 500 })
	}
}
