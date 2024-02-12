'use server'

import { LoginFormData } from '../login/page'
import client from '@/http/client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getDataServer() {
	try {
		return await getDataClient()
	} catch (e) {
		redirect('/login')
	}
}

export async function getDataClient() {
	const {
		data: { message }
	} = await client.get('/data')

	return message
}

export async function logout() {
	const cookieStore = cookies()
	cookieStore.delete('accessToken')
	cookieStore.delete('refreshToken')
}

export async function login(formData: LoginFormData) {
	try {
		const { data, headers } = await client.post('/login', {
			data: formData
		})

		const cookieStore = cookies()
		cookieStore.set('accessToken', data.accessToken)
		cookieStore.set('refreshToken', headers['set-cookie']?.[0]!, {
			httpOnly: true,
			maxAge: 15
		})

		// redirect('/')
	} catch (error) {
		console.log('login handler error')
		// return new Response('Error', { status: 500 })
	}
	return ''
}
